document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    // Get the phone input value

    const state = document.getElementById('state');
    const city = document.getElementById('city');
    let dynamicFieldsContainer;

    // Populate State Dropdown
    state.innerHTML = `
        <option value="">Please select your state</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Haryana">Haryana</option>
        <option value="Maharashtra">Maharashtra</option>
    `;

    // Function to remove dynamic fields
    function removeDynamicFields() {
        if (dynamicFieldsContainer) {
            dynamicFieldsContainer.remove();
            dynamicFieldsContainer = null;
        }
    }

    // Function to dynamically add fields
    function addFieldsForState(selectedState) {
        removeDynamicFields();
        dynamicFieldsContainer = document.createElement('div');

        if (selectedState === 'Rajasthan') {
            dynamicFieldsContainer.innerHTML = `
                <div class="form-group">
                    <label for="website"><i class="fas fa-globe"></i> Website or domain name <span class="required">*</span></label>
                    <input type="text" class="website" id="website" placeholder="Website or domain name">
                </div>
                <div class="form-group">
                    <label for="project"><i class="fas fa-pencil-alt"></i> Project Description <span class="required">*</span></label>
                    <textarea id="project" placeholder="Project Description"></textarea>
                </div>
            `;
        } else if (selectedState === 'Haryana') {
            dynamicFieldsContainer.innerHTML = `
                <div class="form-group">
                    <label for="zip"><i class="fas fa-map-pin"></i> Zip Code <span class="required">*</span></label>
                    <input type="text" id="zip" placeholder="Zip Code">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-server"></i> Do you have hosting? <span class="required">*</span></label>
                    <div>
                        <input type="radio" id="hosting-yes" name="hosting" value="yes">
                        <label for="hosting-yes">Yes</label>
                    </div>
                    <div>
                        <input type="radio" id="hosting-no" name="hosting" value="no">
                        <label for="hosting-no">No</label>
                    </div>
                </div>
            `;
        } else if (selectedState === 'Maharashtra') {
            dynamicFieldsContainer.innerHTML = `
                <div class="form-group">
                    <label for="zip"><i class="fas fa-map-pin"></i> Zip Code <span class="required">*</span></label>
                    <input type="text" id="zip" placeholder="Zip Code">
                </div>
                <div class="form-group">
                    <label for="project"><i class="fas fa-pencil-alt"></i> Project Description <span class="required">*</span></label>
                    <textarea id="project" placeholder="Project Description"></textarea>
                </div>
            `;
        }

        form.insertBefore(dynamicFieldsContainer, form.querySelector('button.submit-btn'));
    }

    // Listener for state change
    state.addEventListener('change', () => {
        const selectedState = state.value;
        addFieldsForState(selectedState);
    });

    // Validation Logic
    document.getElementById("submitButton").addEventListener("click", function () {
        // form.addEventListener('submit', (event) => {
        // event.preventDefault(); // Prevent form from submitting
        const phone = document.getElementById('phone').value;
        let errors = [];

        // Basic validation for required fields
        if (firstName.value.trim() === "") errors.push("First Name is required.");
        if (lastName.value.trim() === "") errors.push("Last Name is required.");
        if (!email.value.trim() || !validateEmail(email.value.trim())) errors.push("E-Mail - is required or invalid.");
        if (city.value === "") errors.push("city is required.");
        console.log('Phone value:', phone);
        // Perform validation
        if (!phone || !validatePhone(phone)) {
            console.log('Phone value:', phone);  // Inspect the phone value
            errors.push('Phone - is invalid.');
        }
        if (state.value === "") errors.push("State is required.");

        // Validate dynamic fields (only if they exist in the DOM)
        const zipCode = document.getElementById('zip');
        let website = document.getElementById('website');
        const projectDesc = document.getElementById('project');
        const hostingYes = document.getElementById('hosting-yes');
        const hostingNo = document.getElementById('hosting-no');
        console.log(website?.value);
        if(!(website?.value === undefined))
        {
            console.log(website?.value);
            if(!validateURL(website?.value))
            {
                errors.push("website is not  valid");
            }
        }
        if (zipCode && zipCode.value.trim() === "") {
            errors.push("ZIP Code is required.");
        }
    

        if (website && website.value.trim() === "" ) {
            errors.push("Website or domain name is required.");
        }
        
        if (projectDesc && projectDesc.value.trim() === "" ) {
            errors.push("Project Description is required.");
        }
        if (hostingYes || hostingNo) {
            if (!(hostingYes.checked || hostingNo.checked)) {
                errors.push("Please select whether you have hosting.");
            }
        }

        // Display errors if there are any
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        // If no errors, redirect to the next page and show entered data
        let queryParams = `?first-name=${firstName.value}&last-name=${lastName.value}&email=${email.value}&state=${state.value}`;
        if (zipCode) queryParams += `&zip=${zipCode.value}`;
        if (website) queryParams += `&website=${website.value}`;
        if (projectDesc) queryParams += `&project=${projectDesc.value}`;
        if (hostingYes && hostingYes.checked) queryParams += `&hosting=yes`;
        if (hostingNo && hostingNo.checked) queryParams += `&hosting=no`;

        window.location.href = "index1.html" + queryParams;
    });
});


// Helper function for email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;  // Regex to check if it has exactly 10 digits
    return re.test(phone);  // Returns true if valid, false otherwise
}


function validateURL(url) {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlPattern.test(url);
}