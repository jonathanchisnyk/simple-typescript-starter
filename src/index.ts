import axios from 'axios'

var config = {
    method: 'get',
    url: 'https://snyk.io/api/v1/org/9d0a37dd-b1a6-4355-be33-a51f3dfa4093/projects',
    headers: { 'Authorization': '6545af0e-b577-42c1-895b-c3b8dabf9594'}
  };

        axios(config) 
            .then(function (response) {
                const projects = response.data.projects;
                console.log(projects);
                console.log("INITIAL");    
                projects.forEach((project:any) => {
                    //console.log(project);

                    if(project.type === 'terraformconfig') {
                        axios.delete('https://snyk.io/api/v1/org/9d0a37dd-b1a6-4355-be33-a51f3dfa4093/project/' + project.id, {
                            headers: { 'Authorization': '6545af0e-b577-42c1-895b-c3b8dabf9594'},
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                    }
                    else if(project.type === "maven") {
                        console.log('NOT TERRAFORM');
                        console.log(project);
                        axios.put('https://snyk.io/api/v1/org/9d0a37dd-b1a6-4355-be33-a51f3dfa4093/project/' + project.id + '/move', {
                            headers: { 'Authorization': '6545af0e-b577-42c1-895b-c3b8dabf9594'},
                            data: {
                                targetOrgId: "b450d872-af06-4ab3-a343-b90331d467e0"
                            }
                        })
                        .catch(function(error){
                            console.log(error);
                            console.log("move error");
                        });
                    }
                });
                //console.log(projects);
                console.log("END");
            })
            .catch(function(error){
                console.log(error);
            });