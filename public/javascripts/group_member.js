
        document.getElementById('image1').addEventListener('click', function(){
            for_image(1);
        });
        document.getElementById('image2').addEventListener('click', function(){
            for_image(2);
        });
        document.getElementById('image3').addEventListener('click', function(){
            for_image(3);
        });
        document.getElementById('image4').addEventListener('click', function(){
            for_image(4);
        });
        document.getElementById('image5').addEventListener('click', function(){
            for_image(5);
        });
        
        var member_information = document.getElementById('member_information');

        function for_image(id){

            // half2.style.height = "200px";
            half2.style.padding = "10px 0";

            fetch('/group_member/' + id, {method: 'GET'})
            .then((response) => {
                if(response.status == '200'){
                    return response.json();
                }
            }).then((resJson) => {
                const member_infos = resJson;
                member_infos.map((member_info) => {
                    // console.log(member_info.explanation);
                    member_information.innerHTML = member_info.explanation;
                });
            }).catch((err) => {
                console.log(err);
            });
        }
