let jobs = [];

// Elements
const jobList = document.getElementById("jobList");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");

// Fetch jobs from JSON
fetch("data/jobs.json")
  .then(response => response.json())
  .then(data => {
    jobs = data;
    displayJobs(jobs);
  });

// Display jobs
function displayJobs(jobData) {
  jobList.innerHTML = "";

  if (jobData.length === 0) {
    jobList.innerHTML = `<p class="text-center">No jobs found.</p>`;
    return;
  }

  jobData.forEach(job => {
    jobList.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${job.title}</h5>
            <p class="card-text">${job.company}</p>
            <span class="badge bg-primary">${job.location}</span>
            <span class="badge bg-success">${job.type}</span>
            <div class="mt-3">
              <button class="btn btn-outline-dark btn-sm">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// Filter jobs
function filterJobs() {
  const searchText = searchInput.value.toLowerCase();
  const location = locationFilter.value;
  const type = typeFilter.value;

  const filteredJobs = jobs.filter(job =>
    (job.title.toLowerCase().includes(searchText) ||
     job.company.toLowerCase().includes(searchText)) &&
    (location === "" || job.location === location) &&
    (type === "" || job.type === type)
  );

  displayJobs(filteredJobs);
}

// Event listeners
searchInput.addEventListener("input", filterJobs);
locationFilter.addEventListener("change", filterJobs);
typeFilter.addEventListener("change", filterJobs);
