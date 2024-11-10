import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient('http://localhost:9000/graphql');

export const getJobs = async () => {
    const query = gql`
        query {
            jobs {
                id
                description
                title
                date
            }
        }
    `;

    const data = await client.request(query);

    return data.jobs;
};

export const getJob = async (id) => {
  const query = gql`
    query job($id: ID!) {
      job(id: $id) {
        id
        title
        description
        date
        company {
          id
          name
        }
      }
    }
  `;

  const variables = { id };

  const data = await client.request(query, variables);
  return data.job;
};

export const getCompanyDetail = async (id) => {
    const query = gql`
    query company($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
            id
            title
            description
            date
        }
      }
    }
  `;

  const variables = { id };

  const data = await client.request(query, variables);
  return data.company;
};

export const getCompanies = async () => {
    const query = gql`
        query companies {
            getCompanies {
                id
                name
            }
        }
    `;

    const data = await client.request(query);

    return data.getCompanies;
}

export const createJob = async (inputJob) => {
    const query = gql`
        mutation($input: CreateJobInput) {
            createJob(input: $input) {
                success
                job {
                    id
                }
            }
        }
    `;

    const data = await client.request(query, {
        input: {
            title: inputJob?.title,
            description: inputJob?.description,
            companyId: inputJob?.company
        }
    });

    return data.createJob;
};