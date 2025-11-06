let initialState = { email: '', message: '' };
let formData = { ...initialState };
const FORM_DATA_STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const handleChange = ({ target: { name, value } }) => {
  formData[name] = value.trim();

  localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(formData));
};

const handleSubmit = e => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('All fields must be filled in!');

    return;
  }

  console.log(formData);

  formData = { ...initialState };
  localStorage.removeItem(FORM_DATA_STORAGE_KEY);
  refs.form.reset();
};

const handleFillingForm = form => {
  const data = localStorage.getItem(FORM_DATA_STORAGE_KEY);

  if (data == null) return;

  formData = JSON.parse(data);

  const formDataKeys = Object.keys(formData);

  for (const key of formDataKeys) {
    form.elements[key].value = formData[key];
  }
};

handleFillingForm(refs.form);

refs.form.addEventListener('input', handleChange);
refs.form.addEventListener('submit', handleSubmit);
