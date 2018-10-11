import {makeGetRequest, makePostRequest} from "../../../../utils/cuiResource";

export function register(user, successCallback, failCallback) {
    const requestOptions = {
        url: '/api/Users/',
        headers: { 'Content-Type': 'application/json' },
        data: user
    };

    makePostRequest(requestOptions, (response) => {
        successCallback(response);
    }, (error)=>{
        failCallback(error);
    });
}

export function login(user, successCallback, failCallback) {
    let requestOptions = {
        url: '/default/login/',
        headers: { 'Content-Type': 'application/json',},

        data: user
    };

    makePostRequest(requestOptions, (response) => {
        successCallback(response);
    }, (error)=>{
        failCallback(error);
    });
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

export function getUserInfo(id, successCallback, failCallback) {
    let token = localStorage.getItem('token');
    let config = {
        url: '/api/Users/' + id + '?access_token=' + token,
        headers: { 'Content-Type': 'application/json'}
    };
    makePostRequest(config, (response) => {
        successCallback(response);
    }, (error)=>{
        failCallback(error);
    });
}