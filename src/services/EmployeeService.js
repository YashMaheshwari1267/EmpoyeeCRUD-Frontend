import axios from 'axios'

const EMPLOYEE_REST_API_URL = "http://localhost:8080/api/employee";

class EmployeeService {
    getEmployees(){
        return axios.get(EMPLOYEE_REST_API_URL);
    }

    getEmployee(id){
        return axios.get(`${EMPLOYEE_REST_API_URL}/${id}`);
    }

    deleteEmployee(id){
        return axios.delete(`${EMPLOYEE_REST_API_URL}/${id}`);
    }

    insertEmployee(){
        return axios.post(EMPLOYEE_REST_API_URL);
    }
}

export default new EmployeeService();