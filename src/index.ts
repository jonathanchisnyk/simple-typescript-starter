import axios from 'axios'

var configGet = {
    method: 'get',
    url: 'https://snyk.io/api/v1/org/'orgid'/projects',
    headers: { 'Authorization': enter your apikey}
  };

  var configDelete = {
    method: 'delete',
    url: 'https://snyk.io/api/v1/org/enterorgidhere/project/',
    headers: { 'Authorization': enter your apikey}
  };

  var configMove = {
    method: 'put',
    url: 'https://snyk.io/api/v1/org/enterorgidhere/project/',
    headers: { 'Authorization': enter your apikey},
    data: { 'targetOrgId': enter target org}
  };

  var configIssues = {
    method: 'post',
    url: 'https://snyk.io/api/v1/org/enterorgidhere/project/',
    headers: { 'Authorization': enter your apikey},
    data: {
        "includeDescription": false,
        "includeIntroducedThrough": false,
        "filters": {
          "severities": [
            "critical",
            "high"
          ],
          "exploitMaturity": [
            "mature",
            "proof-of-concept"
          ],
          "types": [
            "vuln",
            "license"
          ],
          "ignored": false,
          "patched": false,
          "priority": {
            "score": {
              "min": 0,
              "max": 1000
            }
          }
        }
      }
  };

        axios(configGet) 
            .then(function (response) {
                const projects = response.data.projects;
                console.log(projects);
                console.log("INITIAL");    
                projects.forEach((project:any) => {
                    //console.log(project);

                    if(project.type === 'terraformconfig') {
                        var tempUrl = configDelete.url;
                        configDelete.url = configDelete.url + project.id;
                        // axios.delete('https://snyk.io/api/v1/org/9d0a37dd-b1a6-4355-be33-a51f3dfa4093/project/' + project.id, {
                        //     headers: { 'Authorization': '6545af0e-b577-42c1-895b-c3b8dabf9594'},
                        // })
                        // .catch(function(error){
                        //     console.log(error);
                        // });
                        axios(configDelete)
                        .catch(function(error){
                            console.log(error);
                            console.log("delete error");
                        });

                        configDelete.url = tempUrl;
                    }
                    else if(project.type === 'dockerfile') {
                        var tempUrl = configMove.url;
                        configMove.url = configMove.url + project.id + '/move';
                        // axios.put('https://snyk.io/api/v1/org/9d0a37dd-b1a6-4355-be33-a51f3dfa4093/project/' + project.id + '/move', {
                        //     headers: { 'Authorization': '6545af0e-b577-42c1-895b-c3b8dabf9594'},
                        //     data: {
                        //         targetOrgId: "b450d872-af06-4ab3-a343-b90331d467e0"
                        //     }
                        // })
                        // .catch(function(error){
                        //     console.log(error);
                        //     console.log("move error");
                        // });
                        axios(configMove)
                        .catch(function(error){
                            console.log(error);
                            console.log("move error");
                        });
                        configMove.url = tempUrl;
                    }
                    else {
                        var issueUrl = configIssues.url;
                        configIssues.url = configIssues.url + project.id + "/aggregated-issues";
                        axios(configIssues)
                            .then(function(response){
                                
                                var issues = response.data.issues;
                                issues.forEach((issue:any) => {
                                    console.log(issue);
                                });
                            })
                            .catch(function(error){
                                console.log(error);
                                console.log("issue error");
                            });
                            configIssues.url = issueUrl;
                    }
                });
                //console.log(projects);
                //console.log("END");
            })
            .catch(function(error){
                console.log(error);
            });
