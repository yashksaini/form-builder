const preview = document.querySelector("#preview");
// 0 - Email
// 1 - Short Answer
// 2 - Radio
// 3 - Checkbox
// 4 - Dropdown
let questions = JSON.parse(localStorage.getItem("Questions")) || [];
const submitedData = document.querySelector("#submitedData");
const displayPreview = () => {
  preview.innerHTML = "";
  questions.forEach((que) => {
    if (que.title !== "") {
      if (que.type == 0) {
        preview.innerHTML += `
              <div class='card'>
                  <h2>${que.title} *</h2>
                  <input class='textInput' type='email' name='${que.id}' placeholder='Your answer' required/>
              </div>`;
      } else if (que.type == 1) {
        preview.innerHTML += `
                <div class='card'>
                    <h2>${que.title} *</h2>
                    <input class='textInput' type='text' name='${que.id}' placeholder='Your answer' required/>
                </div>`;
      } else if (que.type == 2) {
        let options = "";
        que.options.forEach((option, index) => {
          options += `
              <div class='eachInput'><input class='radio' type='radio' name='${que.id}' id='formValue${que.id}_${index}' required value='${option}' />
              <label for='formValue${que.id}_${index}'>${option}</label></div>`;
        });

        preview.innerHTML += `
                  <div class='card'>
                      <h2>${que.title} *</h2>
                      ${options}
                  </div>`;
      } else if (que.type == 3) {
        let options = "";
        que.options.forEach((option, index) => {
          options += `
                <div class='eachInput'><input class='checkbox' value='${option}' type='checkbox' name='${que.id}' id='formValue${que.id}_${index}'  />
                <label for='formValue${que.id}_${index}'>${option}</label></div>`;
        });

        preview.innerHTML += `
                    <div class='card'>
                        <h2>${que.title} </h2>
                        ${options}
                    </div>`;
      } else if (que.type == 4) {
        let options = "";
        que.options.forEach((option, index) => {
          options += `
                  <option value='${option}'>${option}</option>`;
        });

        preview.innerHTML += `
                      <div class='card'>
                          <h2>${que.title} *</h2>
                          <select class='select' name='${que.id}' required>
                          <option hidden value=''>Select ${que.title} </option>
                          ${options}
                          </select>
                      </div>`;
      }
    }
  });
  preview.innerHTML += `<button class='addField' type='submit'>Submit</button> `;
};
displayPreview();

document.querySelector("form").addEventListener("submit", (e) => {
  // To restict the form data sent to the url
  e.preventDefault();
  // Getting the data of the the form
  const formData = new FormData(e.target);
  let submitData = [];
  // Clearing the formsValues array
  let formValues = [];
  let prevKey = "";

  for (const [key, value] of formData) {
    if (prevKey == key) {
      submitData[key] = submitData[key] + ", " + value;
    } else {
      submitData[key] = value;
    }
    prevKey = key;
  }
  for (let key in submitData) {
    formValues.push({
      key: key,
      value: submitData[key],
    });
  }
  localStorage.setItem("form_data", JSON.stringify(formValues));
  displayFormData();
});

const clearData = () => {
  localStorage.setItem("form_data", JSON.stringify([]));
  window.location.reload();
};
const displayFormData = () => {
  let allData = JSON.parse(localStorage.getItem("form_data")) || [];
  submitedData.innerHTML = "";
  allData.forEach((form) => {
    console.log(questions, form);
    submitedData.innerHTML += `<div class='filledValue'><b>${
      questions.find((el) => el.id == form.key).title
    }:</b> ${form.value}</div>`;
  });
};

displayFormData();
