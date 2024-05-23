import React from "react";
//change to emp profile for admin
// non admin cannot change their profile
function Profile() {
  return (
    <main className="main-container">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="my-5">
              <h3>Employee Profile</h3>
              <hr />
            </div>

            <form class="file-upload">
              <div class="row mb-5 gx-5">
                <div class="col-xxl-8 mb-5 mb-xxl-0">
                  <div class="bg-secondary-soft px-4 py-5 rounded">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="form-label">First Name</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          aria-label="First name"
                          value=""
                        />
                      </div>

                      <div class="col-md-6">
                        <label class="form-label">Last Name</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          aria-label="Last name"
                          value=""
                        />
                      </div>

                      <div class="col-md-6">
                        <label class="form-label">Phone number</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          aria-label="Phone number"
                          value=""
                        />
                      </div>

                      <div class="col-md-6">
                        <label class="form-label">Username</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          aria-label="Phone number"
                          value=""
                        />
                      </div>

                      <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="inputEmail4"
                          value=""
                        />
                      </div>

                      <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">
                          Email
                        </label>
                        <select name="" id="" className="form-control">
                          <option value="1">True</option>
                          <option value="0">False</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="gap-3 d-md-flex justify-content-md-end text-center">
                <button type="button" class="btn btn-danger ">
                  Delete profile
                </button>
                <button type="button" class="btn btn-primary ">
                  Update profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
