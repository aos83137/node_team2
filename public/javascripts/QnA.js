var QnA_btn = document.getElementById('QnA_btn');
var backBtn = document.getElementById("backBtn");
var question = document.getElementById("question");
var qna_con_btn = document.getElementById("qna_con_btn");
var user_u_nickName = document.getElementById("get_u_nickName");

var control = 0;    //답글과 관련된 Element를 컨트롤하기 위함.

backBtn.addEventListener('click', function () {  //질문하기 버튼 눌러 밑에 뜬 것 중 취소를 누르면 다시 접히는 거.
    question.style.display = 'none';
    qna_con_btn.style.display = 'none';
    QnA_btn.style.display = 'block';
});
QnA_btn.addEventListener('click', function () { //질문하기 버튼 눌렀을 때 밑에 뜨게 하는거.
    question.style.display = 'block';
    qna_con_btn.style.display = 'block';
    QnA_btn.style.display = 'none';
});

document.querySelectorAll('#QnA_table tr').forEach(function (el) {
    el.addEventListener('click', function () {
        var id = el.querySelector('td[id=for_qid]').textContent;
        getContent(id);
    });
});

function getContent(id) {
    if (control == 1) {   //답글 보기를 누른 후 취소를 안 누르고 다른 질문 리스트를 눌렀을 때 control이 안 바뀌고 요소들이 remove 안 된 것을 처리하기 위함.
        answer_see_content.remove();
        answer_dissa.remove();
        control = 0;
    }

    fetch('/QnA/' + id, {   //해당 질문에 대한 정보를 ajax로 가져오기 위함
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
            for_info_div.innerHTML = '';
            content.map((qna) => {
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
                var none_content = document.createElement('text');
                none_content.textContent = '취소';
                none_content.id = "none_content";
                none_content.addEventListener('click', () => {
                    for_title.remove();
                    for_content.remove();
                    answer_see.remove();
                    edit.remove();
                    remove.remove();
                    answer.remove();
                    none_content.remove();
                    answer_see_content.remove();
                    answer_dissa.remove();
                    control = 0;
                });

                var answer_see = document.createElement('text');
                answer_see.textContent = '답글 보기';
                answer_see.id = 'answer_see';
                answer_see.addEventListener('click', () => {    //답글보기 눌렀을 때.
                    if (control == 0) {
                        var answer_see_content = document.createElement('textarea');
                        answer_see_content.rows = 5;
                        answer_see_content.id = 'answer_see_content';
                        answer_see_content.disabled = 'true';
                        for_info_div.append(answer_see_content);

                        var answer_dissa = document.createElement('text');
                        answer_dissa.textContent = '취소';
                        answer_dissa.id = 'answer_dissa';
                        for_info_div.append(answer_dissa);

                        fetch('/QnA/answer/' + qna.id, { method: 'GET' })
                            .then((response) => {
                                if (response.status == '200') {
                                    return response.json();
                                }
                            })
                            .then((resJson) => {
                                const answer_infos = resJson;
                                answer_infos.map((answer_info) => {
                                    answer_see_content.innerHTML = answer_info.answer;
                                })
                                if (answer_see_content.value == '') {
                                    answer_see_content.innerHTML = '아직 등록된 답변이 없습니다.'
                                }
                                control = 1;
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                    answer_dissa.addEventListener('click', () => {
                        control = 0;
                        answer_see_content.remove();
                        answer_dissa.remove();
                    });
                });

                var answer = document.createElement('text');
                answer.textContent = '답글달기';
                answer.id = "answer";

                if (!user_u_nickName) {
                    for_info_div.append(answer_see);
                    for_info_div.append(none_content);
                } else {
                    if (user_u_nickName.value == qna.q_nick) {
                        for_info_div.append(answer_see);
                        for_info_div.append(edit);
                        for_info_div.append(remove);
                        for_info_div.append(none_content);
                    }
                    else if (user_u_nickName.value == '관리자') {
                        for_info_div.append(answer_see);
                        for_info_div.append(answer);
                        for_info_div.append(remove);
                        for_info_div.append(none_content);

                        var answer_div = document.createElement('div');

                        var answer_form = document.createElement('form');
                        answer_form.action = '/QnA/' + qna.id;
                        answer_form.method = 'POST'
                        var answer_box = document.createElement('textarea');
                        answer_box.rows = 5;
                        answer_box.name = 'answer';
                        answer_box.id = 'answer_box';


                        var answer_submit = document.createElement('input');
                        answer_submit.value = '등록';
                        answer_submit.id = 'answer_submit';
                        answer_submit.type = 'submit';
                        answer_submit.style.marginRight = '10px';
                        var answer_cancel = document.createElement('input');
                        answer_cancel.type = 'reset';
                        answer_cancel.value = '취소';
                        answer_cancel.id = 'answer_cancel';

                        answer.addEventListener('click', () => {
                            answer_form.appendChild(answer_box);
                            answer_form.appendChild(answer_submit);
                            answer_form.appendChild(answer_cancel);
                            answer_div.append(answer_form);
                            for_info_div.append(answer_div);
                        });

                        answer_cancel.addEventListener('click', () => {
                            answer_div.remove();
                        });
                    } else {
                        for_info_div.append(answer_see);
                        for_info_div.append(none_content);
                    }
                }
            });
        }).catch((error) => {
            console.error('fetch 호출에서 에러발생: ' + error.message);
        });
}