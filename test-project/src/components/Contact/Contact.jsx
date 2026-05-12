import { Link } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
	//名前の入力内容を保存する箱
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // 名前の入力内容を保存する箱
  const [errors, setErrors] = useState({});

  // 送信中かどうか 最初は「送信していない状態」だからfalse
  //false → 送信してない
  //true → 送信中
  //false → 完了
  const [isSubmitting, setIsSubmitting] = useState(false);

  // バリデーション
  const validate = () =>{
    //エラーを一時保存
    const newErrors = {};

    if (!name){
        newErrors.name = "名前は必須です";
    } else if (name.length > 30){
    newErrors.name = "30文字以内で入力してください";
    }

    if (!email){
        newErrors.email = "メールは必須です";
    }else if (!email.includes("@")){
        newErrors.email = "メール形式が正しくありません";
    }

    if (!message){
        newErrors.message = "本文は必須です";
    }else if (message.length > 500){
        newErrors.message = "500文字以内で入力してください";
    }
    return newErrors;
  }

  // 送信処理
  //e=イベント情報（ボタン押した情報）
  const handleSubmit = async (e)=>{
		//ページリロード防止
    e.preventDefault();

    //validate実行
    const validationErrors = validate();

    //エラーの数を配列にする 1個でもあればエラーあり
    if (Object.keys(validationErrors).length>0){
      //エラー表示して終了
      setErrors(validationErrors);
      return;
    }
    //エラーなし
    setErrors({});
    //送信中にする
    setIsSubmitting(true);

    try {
      await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
      {
				//データを送る通信
        method: "POST",
        headers: {"Content-Type": "application/json",},
        //データを文字列に変換
        body: JSON.stringify({
            name,
            email,
            message,
        }),
      });
      alert("送信しました");

      //入力リセット
      handleReset();

    } catch(error){
      alert("送信に失敗しました");
      //成功でも失敗でも必ず実行finally
    }finally{
      //送信終了
      setIsSubmitting(false);
    }
  };
  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
  };
  return(
    <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl mb-4">お問い合わせ</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="">お名前</label>
            <input
					    type="text"
						  placeholder="山田　太朗"
						  value={name}
						  onChange={(e)=>setName(e.target.value)}
						  disabled={isSubmitting}
              className="border p-2 w-full"
					  />
					  {errors.name && <p className="text-red-500">{errors.name}</p>}
					</div>
					<div>
						<label htmlFor="">メールアドレス</label>
					  <input
					    type="text"
						  placeholder="Email@test"
						  value={email}
						  onChange={(e)=>setEmail(e.target.value)}
						  disabled={isSubmitting}
              className="border p-2 w-full"
					  />
						{errors.email && <p className="text-red-500">{errors.email}</p>}
					</div>
					<div>
						<label htmlFor="">本文</label>
						<textarea
						  placeholder="メッセージ"
							value={message}
							onChange={(e)=>setMessage(e.target.value)}
							disabled={isSubmitting}
               className="border p-2 w-full"
						 >
						</textarea>
						{errors.message && <p className="text-red-500">{errors.message}</p>}
					</div>

					<button
					  type="submit"
						disabled={isSubmitting}
            className="bg-black text-white py-2 w-60 hover:bg-gray-600"
					  >
						送信
					</button>
          <button
            type="button"
            onClick={handleReset}
            className="border py-2 w-60 hover:bg-mauve-200"
            disabled={isSubmitting}
            >
            クリア
          </button>
        </form>
    </div>
  );
};
export default Contact;
