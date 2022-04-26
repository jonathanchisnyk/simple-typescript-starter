"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var config = {
    method: 'get',
    url: 'https://snyk.io/api/v1/org/9d0a37dd-b1a6-4355-be33-a51f3dfa4093/projects',
    headers: { 'Authorization': '6545af0e-b577-42c1-895b-c3b8dabf9594' }
};
axios_1.default(config)
    .then(function (response) {
    var projects = response.data.projects;
    console.log(projects);
    console.log("INITIAL");
    projects.forEach(function (project) {
        //console.log(project);
        if (project.type === 'terraformconfig') {
            axios_1.default.delete('https://snyk.io/api/v1/org/9d0a37dd-b1a6-4355-be33-a51f3dfa4093/project/' + project.id, {
                headers: { 'Authorization': '6545af0e-b577-42c1-895b-c3b8dabf9594' },
            })
                .catch(function (error) {
                console.log(error);
            });
        }
        else if (project.type === "maven") {
            console.log('NOT TERRAFORM');
            console.log(project);
            axios_1.default.put('https://snyk.io/api/v1/org/9d0a37dd-b1a6-4355-be33-a51f3dfa4093/project/' + project.id + '/move', {
                headers: { 'Authorization': '6545af0e-b577-42c1-895b-c3b8dabf9594' },
                data: {
                    targetOrgId: "b450d872-af06-4ab3-a343-b90331d467e0"
                }
            })
                .catch(function (error) {
                console.log(error);
                console.log("move error");
            });
        }
    });
    //console.log(projects);
    console.log("END");
})
    .catch(function (error) {
    console.log(error);
});
