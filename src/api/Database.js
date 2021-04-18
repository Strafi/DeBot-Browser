import { createClient } from 'contentful';
import { DB_CONTENT_TYPES, DEFAULT_GOVERNANCE } from 'src/constants';

class DatabaseApi {
	init() {
		this.client = createClient({
			space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
			environment: 'master',
			accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
		})
	}

	getContests(params = {}) {
		const { skip = 0, governance, address } = params;
		const query = {
			skip,
			content_type: DB_CONTENT_TYPES.CONTEST,
			order: '-sys.createdAt'
		};

		if (governance) {
			query['fields.governance.sys.contentType.sys.id'] = DB_CONTENT_TYPES.GOVERNANCE;
			query['fields.governance.fields.name'] = governance;
		}

		if (address)
			query['fields.address'] = address;

		return this.client.getEntries(query);
	}

	async getContestByAddress(address) {
		try {
			const res = await this.getContests({ address });
			const contestInfo = res.items[0].fields;
			contestInfo.governance = contestInfo.governance.fields.name;
			
			return contestInfo;
		} catch(err) {
			console.warn('No contest found in DB by address: ', address);

			return {
				governance: DEFAULT_GOVERNANCE.NAME
			}
		}
	}

	async getGovernances() {
		try {
			const govRes = await this.client.getEntries({
				content_type: DB_CONTENT_TYPES.GOVERNANCE,
				order: 'fields.name',
			});
			const governances = govRes.items.map(item => item.fields);

			return governances
		} catch (err) {
			console.error('Failed to fetch governances: ', err);

			return [];
		}
	}
}

const databaseApi = new DatabaseApi();

export default databaseApi;