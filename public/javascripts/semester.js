function imgClick(id){
    fetch('/semester/'+id, {method:'GET'})
    .then((response)=>{
        if(response.status == '200'){
            return response.json();
        }
    }).then((resJson) =>{
        var lcl_infomation = document.getElementById('img_content')
        const lcl_infos = resJson;
         lcl_infomation.innerHTML = lcl_infos.content;
    }).catch((err) => {
        console.log(err);
    });
}  