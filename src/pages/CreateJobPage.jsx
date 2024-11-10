import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob, getCompanies } from '../lib/graphql/queries';

function CreateJobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [optionCompanies, setOptionCompanies] = useState([]);
  const [company, setCompany] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('should post a new job:', { title, description, company });

    const job = { title, description, company };

    createJob(job).then(res => {
      console.log(res);
      if (res?.success === 'success') {
        navigate('/');
      }
    });
  };

  useEffect(() => {
    getCompanies().then(data => {
      setOptionCompanies(data);
      setCompany(data[0]?.id); // Set default company dari data pertama (jika ada)
    });
  }, []);

  const setInputCompany = (event) => {
    const companySelect = event?.target?.value;
    setCompany(companySelect);
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>
              Select Company
            </label>
            <div className="select w-full">
              <select onChange={(event) => setInputCompany(event)}>
                { optionCompanies && optionCompanies.map(option => {
                  return (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  )
                }) }
              </select>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
