import { useParams } from 'react-router';
import { companies } from '../lib/fake-data';
import { useEffect, useState } from 'react';
import { getCompanyDetail } from '../lib/graphql/queries';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();

  useEffect(() => {
    getCompanyDetail(companyId).then(data => {
      setCompany(data);
    })
  }, [companyId]);
  return (
    company && (
      <div>
          <h1 className="title">
            {company.name}
          </h1>
          <div className="box">
            {company.description}
          </div>

          <h2 className='title is-5'>
            JOBS AT {company.name}
          </h2>

          <JobList jobs={company.jobs} />
      </div>
    )
  );
}

export default CompanyPage;
