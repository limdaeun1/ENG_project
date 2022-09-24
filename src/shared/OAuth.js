const REST_API_KEY = "615cc994005f7b51c9efcb46f52d9101"; //Kakao에서 받은 REST API
const REDIRECT_URI = "http://www.localhost:3000/login/kakao"; //Redirect를 loading페이지로 함

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=6d51c4942788dc0abd939ace6ee2d8b7&redirect_uri=http://localhost:3000/login/kakao`;

// https://kauth.kakao.com/oauth/authorize?client_id=615cc994005f7b51c9efcb46f52d9101&redirect_uri=http://www.localhost:3000/login/kakao&response_type=code