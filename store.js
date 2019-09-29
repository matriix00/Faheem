let state = {
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI0NzMwODVjY2Q1MDNmZWJlN2FmMTExNTY5NGQ0OGYzY2I4ZWU5ZjlmZjMwODM2OTE5OTkyNDU0Yzk3NjJkZTc5ODFlNDZjMTNlMzk2MjdhIn0.eyJhdWQiOiIxIiwianRpIjoiYjQ3MzA4NWNjZDUwM2ZlYmU3YWYxMTE1Njk0ZDQ4ZjNjYjhlZTlmOWZmMzA4MzY5MTk5OTI0NTRjOTc2MmRlNzk4MWU0NmMxM2UzOTYyN2EiLCJpYXQiOjE1NjI0NDg1MzQsIm5iZiI6MTU2MjQ0ODUzNCwiZXhwIjoxNTk0MDcwOTM0LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.VFxP5C2FhH8xsGk936d5S2wB-RDkrNUx6t6sEnZACxOgjkksgx2fC1DzNlo3S6Ejek5QCm6PCoNJGXR8mP1I7l-ukoHuBWWtNrnFaz0AOKFL_8_NzzYE9rE5dPXjIddFmWUouf3a5393n47fPOA737vykndRjOjpXCPwwq4q3RHAXzUI4Pxg2ZKAgRRE12NA_yGUEoApVnuiYZYAxiaPyfZpF_tg8QwPSk_T9LMxylkeHNHq8uLrlDmKJyfH0V3sVZoBK1BjZZdjRQtRJGZThBdwBoiN0d8te1yjkENIi9G6fEEN53wWLCZAYUX4SoGW2JU-vD3dlUvdWCxc-svHGscLop9XhuMpmqwDf_at_vLuzR1dmEfq67IZxLQE4_XWzhz2nZ0XgD4SroRMhnMHiXsPAjTJgX0mE1ZmQnvhxJyLUiRSyMjlOmxGG5hKtDoQzKv3GMPLl9HJCsGHOVT-IjIzk6otePNWgBxqwQDnrlga55Pv14H33QMItxzu4Cc9KCT29qi9rRTl7G078t4QESU3uRnn-H5tqK06oykSQyHMZxCu42EvI_lUoaUuQhYqfeeITM0l9iVU-JMEvDkcxmO2nzT7GmGidsIfuYI44M5lnmj6BIMHW8gPMJRUQxY9m88d0c1gZpIUNBV0RitBU-2hgitp86gNVPyKMhBpLGM",
    name:'',
    type:'',
    image:'',
    id:'',
}
const listeners = [];

export default {
    getState() {
        return state;
    },
    setState(newState) {
        state = { ...state, ...newState };
    },
    onChange(newListener) {
        listeners.push(newListener);
        return () => listeners.filter(listener => listener !== newListener);
      },
};
