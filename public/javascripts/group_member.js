
        image1.addEventListener('click', function(){
            for_image(1);
        });
        image2.addEventListener('click', function(){
            for_image(2);
        });
        image3.addEventListener('click', function(){
            for_image(3);
        });
        image4.addEventListener('click', function(){
            for_image(4);
        });
        image5.addEventListener('click', function(){
            for_image(5);
        });

        var member_information = document.getElementById('member_information');
        
        var control = 0;
        
        function for_image(id){
            if(control == id){
                member_information.innerHTML = '';
                control = 0;
            }else{
                fetch('/group_member/' + id, {method: 'GET'})
                .then((response) => {
                    if(response.status == '200'){
                        return response.json();
                    }
                }).then((resJson) => {
                    const member_infos = resJson;
                    member_infos.map((member_info) => {
                        // console.log(member_info.explanation);
                        console.log('안녕'+member_information);            
                        member_information.innerText = member_info.explanation;
                    });
                }).catch((err) => {
                    console.log(err);
                });
                control = id;
            }
            // half2.style.height = "200px";
        }
