


function myfunctio()
{
    var xhr = new XMLHttpRequest();
                        xhr.open("POST", "{{https://devsoc-test.herokuapp.com/}}/team/one", true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.send(JSON.stringify(teamID));
                        xhr.onload = function () {
                            
                            if (this.status == 200) {

                                var namelst="";
                                for(var member in data.teams.users){
                                    namelst+=data.teams.users[member];
                                    namelst+=" ";
                                }

                                var data = JSON.parse(this.responseText);
                                console.log(data);
                                document.getElementById("team").innerHTML=data.teams.name;
                                document.getElementById("memebers").innerHTML=`Members - data.teams.members`;                                
                                document.getElementById("names").innerHTML=namelst;  
                                
                                document.getElementById("msg").value = data.teams.demovidlink;
                                document.getElementById("name").value = data.teams.ideaname;
                                document.getElementById("repolink").value = data.teams.repolink;
                                document.getElementById("projdesc").value = data.teams.projdesc;
                            }
                                
                        };

}
