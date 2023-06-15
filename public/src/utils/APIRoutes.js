export const host = process.env.REACT_APP_HOST + ":" + process.env.REACT_APP_PORT;
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const getUsersRoute = `${host}/api/auth/getUsers`;
export const createProjectRoute = `${host}/api/projects/createProject`
export const deleteProjectRoute = (id) => `${host}/api/projects/${id}`;
export const updateProjectRoute = `${host}/api/projects/updateProject`
export const getProjectsRoute = `${host}/api/projects/getProjects`
