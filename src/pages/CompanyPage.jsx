import { useParams } from 'react-router';
import { companies } from '../lib/fake-data';
import { useEffect, useState } from 'react';
import { getCompanyDetail } from '../lib/graphql/queries';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState({
    company: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    

    (async () => {
      try {
        const company = await getCompanyDetail(companyId);
        setCompany({ company, loading: false, error: false })
      } catch (error) {
        const messages = error.response.errors.map(error => error.message)
        
        setCompany({ company: null, loading: false, error: messages[0] })
      }
    })();
  }, [companyId]);
  if (company.loading) {
    return <div>loading...</div>
  } else if(!company.loading && !company.company && company.error) {
    return <div>{company.error}</div>
  }
  return (
    company.company && (
      <div>
          <h1 className="title">
            {company.company.name}
          </h1>
          <div className="box">
            {company.company.description}
          </div>

          <h2 className='title is-5'>
            JOBS AT {company.company.name}
          </h2>

          <JobList jobs={company.company.jobs} />
      </div>
    )
  );
}

export default CompanyPage;
