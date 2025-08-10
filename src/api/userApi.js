import axios from '../../constant';

// ===== USER AUTH =====
export const signUp = async (data) => {
  const response = await axios.post('/sign_up', data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post('/login', data);
  return response.data;
};

export const logout = async () => {
  const response = await axios.get('/logout');
  localStorage.removeItem('token');
  return response.data;
};


// ===== SKILLS =====
export const addSkill = async (data) => {
  const response = await axios.post('/add_skill', data);
  return response.data;
};

export const getSkills = async () => {
  const response = await axios.get('/get_all_skills');
  return response.data;
};

// ===== QUESTIONS =====
export const addQuestion = async (data) => {
  const response = await axios.post('/add_questions', data);
  return response.data;
};

export const getQuestionsBySkill = async (skill_id) => {
  const response = await axios.get(`/get_question_by_skill/${skill_id}`);
  return response.data;
};

// ===== QUIZ FLOW =====
export const startQuiz = async (data) => {
  const response = await axios.post('/start', data);
  return response.data;
};

export const submitAnswer = async (data) => {
  const response = await axios.post('/answer', data);
  return response.data;
};

export const finishQuiz = async (data) => {
  const response = await axios.post('/finish', data);
  return response.data;
}; 

// ===== REPORTS =====
export const getQuizHistory = async (user_id) => {
  const response = await axios.get(`/user/${user_id}`);
  return response.data;
};

export const getSkillPerformance = async (user_id) => {
  const response = await axios.get(`/skill-gap/${user_id}`);
  return response.data;
};

export const getTimeBasedReport = async (start_date, end_date) => {
  const response = await axios.get(`/time-based?start_date=${start_date}&end_date=${end_date}`);
  return response.data;
};

// ===== ADMIN (to get all users) =====
export const getUsers = async () => {
  const response = await axios.get('/get_all_users');
  return response.data;
};

export const addRole = async (data) => {
  const response = await axios.post('/roles', data);
  return response.data;
};
