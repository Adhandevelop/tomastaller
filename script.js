const grades = [
  { subject: 'PROFESSIONAL PRACTICE IV', final: 4.2, credits: 4, type: 'NORMAL', date: '29 / 05 / 2026' },
  { subject: 'ANGLOPHONE CULTURE', final: 4.6, credits: 4, type: 'NORMAL', date: '29 / 05 / 2026' },
  { subject: 'PRINCIPIOS DE GESTIÓN EDUCATIVA', final: 4.6, credits: 3, type: 'NORMAL', date: '29 / 05 / 2026' },
  { subject: 'ACADEMIC READING AND WRITING', final: 4.1, credits: 2, type: 'NORMAL', date: '29 / 05 / 2026' },
  { subject: 'CIUDADANO DIGITAL', final: 4.7, credits: 2, type: 'NORMAL', date: '29 / 05 / 2026' },
  { subject: 'EVALUATION AND ASSESMENT DESIGN', final: 4.5, credits: 2, type: 'NORMAL', date: '29 / 05 / 2026' },
  { subject: 'INVESTIGACIÓN CUALITATIVA', final: 4.4, credits: 2, type: 'NORMAL', date: '29 / 05 / 2026' }
];

const loginScreen = document.getElementById('loginScreen');
const appContent = document.getElementById('appContent');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const tableBody = document.getElementById('gradesTableBody');
const avgGeneral = document.getElementById('avgGeneral');
const approvedSubjects = document.getElementById('approvedSubjects');

const validUser = 'jtabril@ucompensar.edu.co';
const validPassword = 'Juliantomas123';

function showApp() {
  loginScreen.classList.add('hidden');
  appContent.classList.remove('hidden');
}

function showLogin() {
  appContent.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  loginError.textContent = '';
  loginForm.reset();
}

function isAuthenticated() {
  return localStorage.getItem('academicAccess') === 'true';
}

function setAuthenticated(value) {
  localStorage.setItem('academicAccess', String(value));
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === validUser && password === validPassword) {
    setAuthenticated(true);
    showApp();
  } else {
    loginError.textContent = 'Usuario o contraseña incorrectos.';
  }
});

logoutBtn.addEventListener('click', () => {
  setAuthenticated(false);
  showLogin();
});

if (isAuthenticated()) {
  showApp();
} else {
  showLogin();
}

const totalAverage = (
  grades.reduce((sum, item) => sum + item.final, 0) / grades.length
).toFixed(1);

avgGeneral.textContent = totalAverage;
approvedSubjects.textContent = grades.length;

function renderTable() {
  tableBody.innerHTML = grades
    .map(
      (item) => `
        <tr>
          <td>${item.subject}</td>
          <td><strong>${item.final.toFixed(1)}</strong></td>
          <td>${item.credits}</td>
          <td>${item.type}</td>
          <td>${item.date}</td>
        </tr>
      `
    )
    .join('');
}

renderTable();
