import {useState,useRef,Fragment} from "react";
import {useMutation} from "@tanstack/react-query";
import boardClient from "../../board-commons";// 서버 연결
import {useNavigate} from "react-router-dom";//화면 이동

function BoardInsert(){
    const nav=useNavigate();
    const [name,setName]=useState<string>("");
    const [subject,setSubject]=useState<string>("");
    const [content,setContent]=useState<string>("");
    const [pwd,setPwd]=useState<string>("");

    const nameRef=useRef<HTMLInputElement>(null)
    const subjectRef=useRef<HTMLInputElement>(null)
    const pwdRef=useRef<HTMLInputElement>(null)
    const contentRef=useRef<HTMLTextAreaElement>(null)

    const {mutate:boardInsert}=useMutation({
        mutationFn: async()=>{
            return await boardClient.post("/board/insert_node",{
                name:name,
                subject:subject,
                content:content,
                pwd:pwd
            })
        },
        onSuccess:(res)=>{
            if(res.data.msg==='yes')
            {
                window.location.href='/board/list';
            }
            else
            {
                alert("게시판 등록에 실패하셨습니다")
            }
        },
        onError:(err:Error)=>{
            console.log("Error발생:",err.message)
        }
    })
    // 이벤트 처리
    const insert=():void=>{
        if(!name.trim())
            return nameRef.current?.focus();
        if(!subject.trim())
            return subjectRef.current?.focus();
        if(!content.trim())
            return contentRef.current?.focus();
        if(!pwd.trim())
            return pwdRef.current?.focus();

        boardInsert()
    }
    return (
        <Fragment>
            <h2 className="text-center"  style={{marginTop: 50}}>글 작성</h2>
            <div className="container">
                <div className="row" style={{"width": "900px","margin": "0px auto"}}>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td width={"15%"}>이름</td>
                            <td width={"85%"}>
                                <input type={"text"} size={15} className={"input-sm"}
                                       ref={nameRef}
                                       value={name}
                                       onChange={(e:any):void=>setName(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"}>제목</td>
                            <td width={"85%"}>
                                <input type={"text"} size={55} className={"input-sm"}
                                       ref={subjectRef}
                                       value={subject}
                                       onChange={(e:any):void=>setSubject(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"}>내용</td>
                            <td width={"85%"}>
                                      <textarea rows={10} cols={55}
                                                ref={contentRef}
                                                value={content}
                                                onChange={(e:any):void=>setContent(e.target.value)}>
                                      </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"}>비밀번호</td>
                            <td width={"85%"}>
                                <input type={"password"} size={15} className={"input-sm"}
                                       ref={pwdRef}
                                       value={pwd}
                                       onChange={(e:any):void=>setPwd(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={"text-center"}>
                                <button className="btn-sm btn-default" onClick={()=>insert()}>글쓰기</button>
                                &nbsp;
                                <button className="btn-sm btn-default" onClick={()=>nav(-1)}>취소</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}
export default BoardInsert;