var QnA_btn = document.getElementById('QnA_btn');
var backBtn = document.getElementById("backBtn");
var question = document.getElementById("question");
var qna_con_btn = document.getElementById("qna_con_btn");

backBtn.addEventListener('click', function(){
    Qbtn_click();
});
QnA_btn.addEventListener('click', function(){
    Qbtn_click();
});

function Qbtn_click(){

    if (question.style.display == 'none') {
        // 질문하기 버튼 클릭시 input과 질문취소, 질문추가 버튼 표시
        question.style.display = 'block';
        qna_con_btn.style.display = 'block';
        QnA_btn.style.display = 'none';
    }else if (backBtn.click) { // 질문취소 버튼 클릭시 원래대로
        question.style.display = 'none';
        qna_con_btn.style.display = 'none';
        QnA_btn.style.display = 'block';
    }
}


document.querySelectorAll('#QnA_table tr').forEach(function (el) {
    el.addEventListener('click', function() {
        var id = el.querySelector('td').textContent;
        getContent(id);
    });
});

// 댓글 로딩
function getContent(id) {
    fetch('/QnA/' + id, {method: 'GET'})
    .then((response) => {
        if(response.status == '200') {
            return response.json();
        }
    }).then((resJson) => {
        console.log(resJson);
        const content = resJson;
        var for_info_div = document.querySelector('#qna_information');
        for_info_div.innerHTML = '';
        content.map( (qna) => {
            var for_title = document.createElement('input');
            for_title.type='text';
            for_title.id= 'name'
            for_title.value = qna.q_title;
            for_title.textContent = qna.q_title;
            for_info_div.append(for_title);
            var for_content = document.createElement('textarea')
            for_content.value = qna.q_body;
            for_content.rows = '6';
            for_info_div.append(for_content);
            var edit = document.createElement('text');
            edit.textContent = '수정';
            edit.id = "edit";
            edit.addEventListener('click', () => {
                fetch('/QnA/' + qna.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "PATCH",
                    body: JSON.stringify({title : for_title.value, content: for_content.value})
                }).then((response) => {
                    if(response.status == '200') {
                        return response.json();
                    }
                }).then((resJson) => {
                    console.log(resJson);
                    location.reload();
                }).catch((error) => {
                    console.error('fetch 호출에서 에러발생: ' + error.message);
                });
            });
            var remove = document.createElement('text');
            remove.textContent = '삭제';
            remove.id = "remove";
            remove.addEventListener('click', () => { 
                //삭제 클릭시
                fetch('/QnA/' + qna.id, {method: 'delete'}
                ).then((response) => {
                    if(response.status == '200'){
                        return response.json();
                    }
                }).then((resJson) => {
                    console.log(resJson);
                    location.reload();
                }).catch((error) => {
                    console.error('fetch 호출에서 에러발생: ' + error.message);
                });
            });
            for_info_div.append(edit);
            for_info_div.append(remove);
        });
    }).catch((error) => {
        console.error('fetch 호출에서 에러발생: ' + error.message);
    });
}
