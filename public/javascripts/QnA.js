var QnA_btn = document.getElementById('QnA_btn');
var backBtn = document.getElementById("backBtn");
var question = document.getElementById("question");
var qna_con_btn = document.getElementById("qna_con_btn");
var u_nickName = document.getElementById("get_u_nickName");;

backBtn.addEventListener('click', function () {
    question.style.display = 'none';
    qna_con_btn.style.display = 'none';
    QnA_btn.style.display = 'block';
});
QnA_btn.addEventListener('click', function () {
    question.style.display = 'block';
    qna_con_btn.style.display = 'block';
    QnA_btn.style.display = 'none';
});

document.querySelectorAll('#QnA_table tr').forEach(function (el) {
    el.addEventListener('click', function () {
        var id = el.querySelector('td').textContent;
        getContent(id);
    });
});

// 댓글 로딩
function getContent(id) { 

    fetch('/QnA/' + id, {
            method: 'GET'
        })
        .then((response) => {
            if (response.status == '200') {
                return response.json();
            }
        }).then((resJson) => {
            console.log(resJson);
            const content = resJson;
            var for_info_div = document.querySelector('#qna_information');
            var for_info_div_normal = document.querySelector('#qna_information_normal');
            var for_info_div_none = document.querySelector('#qna_information_none');

            content.map((qna) => {
                if (for_info_div) {
                    for_info_div.innerHTML = '';

                    var for_title = document.createElement('input');
                    for_title.type = 'text';
                    for_title.id = 'name'
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
                            body: JSON.stringify({
                                title: for_title.value,
                                content: for_content.value
                            })
                        }).then((response) => {
                            if (response.status == '200') {
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
                        fetch('/QnA/' + qna.id, {
                            method: 'delete'
                        }).then((response) => {
                            if (response.status == '200') {
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
                }else if(for_info_div_normal){
                    for_info_div_normal.innerHTML = '';

                    var for_title = document.createElement('input');
                    for_title.type = 'text';
                    for_title.id = 'name'
                    for_title.value = qna.q_title;
                    for_title.textContent = qna.q_title;
                    for_title.disabled = 'disabled';
                    for_info_div_normal.append(for_title);
                    var for_content = document.createElement('textarea')
                    for_content.value = qna.q_body;
                    for_content.rows = '6';
                    for_content.disabled = 'disabled';
                    for_info_div_normal.append(for_content);
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
                            body: JSON.stringify({
                                title: for_title.value,
                                content: for_content.value
                            })
                        }).then((response) => {
                            if (response.status == '200') {
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
                        fetch('/QnA/' + qna.id, {
                            method: 'delete'
                        }).then((response) => {
                            if (response.status == '200') {
                                return response.json();
                            }
                        }).then((resJson) => {
                            console.log(resJson);
                            location.reload();
                        }).catch((error) => {
                            console.error('fetch 호출에서 에러발생: ' + error.message);
                        });
                    });
                    for_info_div_normal.append(edit);
                    for_info_div_normal.append(remove);
                }else if(for_info_div_none){
                    for_info_div_none.innerHTML = '';

                    var for_title = document.createElement('input');
                    for_title.type = 'text';
                    for_title.id = 'name'
                    for_title.value = qna.q_title;
                    for_title.textContent = qna.q_title;
                    for_title.disabled='disabled';
                    for_info_div_none.append(for_title);
                    var for_content = document.createElement('textarea')
                    for_content.value = qna.q_body;
                    for_content.rows = '6';
                    for_content.disabled='disabled';
                    for_info_div_none.append(for_content);
                    var edit = document.createElement('text');
                }
            });
        }).catch((error) => {
            console.error('fetch 호출에서 에러발생: ' + error.message);
        });
}
