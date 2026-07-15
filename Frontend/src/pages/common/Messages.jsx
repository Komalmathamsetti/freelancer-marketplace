import { useMemo, useState,useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import { sendMessage as sendMessageAPI,getConversations,getMessages } from "../../services/messageServices";
import socket from "../../socket";
const Avatar = ({ initials, online }) => (
  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-sm font-semibold text-blue-700 ring-4 ring-white">
    {initials}
    {online && (
      <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
    )}
  </div>
);

const IconButton = ({ children }) => (
  <button className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700">
    {children}
  </button>
);

export default function MessagingModule() {
  const [conversations, setConversations] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [messages, setMessages] = useState([]);
const [search, setSearch] = useState("");
const [message, setMessage] = useState("");
const [mobileChatOpen, setMobileChatOpen] = useState(false);
const [onlineUsers, setOnlineUsers] = useState([]);
const [loadingMessages, setLoadingMessages] = useState(false);

const currentUser = JSON.parse(localStorage.getItem("user"));

const bottomRef = useRef();

const { userId } = useParams();

const filteredConversations = useMemo(() => {
    return conversations.filter((c) =>
        `${c.full_name} ${c.email} ${c.last_message || ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );
}, [conversations, search]);

const loadMessages = async (id) => {
    try {
        setLoadingMessages(true);

        const response = await getMessages(id);

        if (response.data.success) {
            setMessages(response.data.messages);
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoadingMessages(false);
    }
};

const handleSelect = async (id) => {
    setSelectedId(Number(id));
    setMobileChatOpen(true);
    await loadMessages(id);
};

const selectedConversation = conversations.find(
    (c) => Number(c.id) === Number(selectedId)
);
useEffect(() => {
    socket.emit("join", currentUser.id);
    const fetchConversations = async () => {
        try {
            const response = await getConversations();
            if (response.data.success) {
                let conversationList = [...response.data.conversations];
                if (userId) {
                    const id = Number(userId);
                    const exists = conversationList.find(
                        (c) => Number(c.id) === id
                    );
                    if (!exists) {
                        conversationList.push({
                            id,
                            full_name: "New Conversation",
                            email: "",
                            last_message: "",
                            created_at: new Date().toISOString(),
                        });
                    }
                    setSelectedId(id);
                    setMobileChatOpen(true);
                    await loadMessages(id);
                }
                setConversations(conversationList);
            }
        } catch (error) {
          console.log(error);
        }
    };
    fetchConversations();
}, [currentUser.id, userId]);
useEffect(() => {
    socket.on("receive-message", async (newMessage) => {
        if (
            Number(newMessage.sender_id) === Number(selectedId) ||
            Number(newMessage.reciever_id) === Number(selectedId)
        ) {
          setMessages((prev) => [...prev, newMessage]);
        }
        const response = await getConversations();
        if (response.data.success) {
            setConversations(response.data.conversations);
        }
    });
    return () => {
        socket.off("receive-message");
    };
}, [selectedId]);
useEffect(() => {
    socket.on("online-users", (users) => {
        setOnlineUsers(users);
    });
    return () => {
      socket.off("online-users");
    };
}, []);
const handleSend = async () => {
    if (!message.trim() || !selectedConversation) return;
    try {
        await sendMessageAPI({
            recieverId: selectedConversation.id,
            message,
        });
        setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
        behavior: "smooth",
    });
  }, [messages]);
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-slate-50 to-blue-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="grid min-h-[calc(100vh-2rem)] md:grid-cols-[360px_1fr]">
          {/* Conversation List */}
          <aside
            className={`border-r border-slate-200 bg-white ${
              mobileChatOpen ? "hidden md:flex" : "flex"
            } flex-col`}
          >
            <div className="border-b border-slate-100 p-5">
              <div className="mb-4">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Messages
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Client and freelancer conversations
                </p>
              </div>

              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.3-4.3m1.8-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.08)]"
                />
              </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {filteredConversations.map((c) => {
                const active = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(c.id)}
                    className={`w-full rounded-[28px] border p-4 text-left transition ${
                      active
                        ? "border-blue-200 bg-blue-50 shadow-[0_12px_30px_rgba(59,130,246,0.10)]"
                        : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar initials={c.full_name.charAt(0)} online={onlineUsers.includes(c.id)} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="truncate font-semibold text-slate-900">{c.full_name}</h3>
                          <span className="text-xs text-slate-400">{new Date(c.created_at).toLocaleTimeString([], {hour: "2-digit",minute: "2-digit",})}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-3">
                          <p className="truncate text-sm text-slate-500">{c.last_message}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Chat Window */}
          <main className={`${mobileChatOpen ? "flex" : "hidden md:flex"} flex-col bg-slate-50`}>
            {selectedConversation ? (
              <>
                {/* Header */}
                <div className="border-b border-slate-200 bg-white p-4 md:p-5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setMobileChatOpen(false)}
                      className="md:hidden grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-600"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <Avatar initials={selectedConversation.full_name.charAt(0)} online={onlineUsers.includes(selectedConversation.id)} />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate text-lg font-semibold text-slate-900">
                          {selectedConversation.full_name}
                        </h2>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${onlineUsers.includes(selectedConversation.id)? "bg-green-100 text-green-700": "bg-gray-100 text-gray-600"}`}>
                          {onlineUsers.includes(selectedConversation.id)? "🟢 Online": "⚪ Offline"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">{selectedConversation.email}</p>
                    </div>

                    <div className="hidden gap-2 md:flex">
                      <IconButton>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55-4.55a.75.75 0 0 1 1.28.53V18a.75.75 0 0 1-1.28.53L15 14m-6 4a3 3 0 1 1 0-6h5a3 3 0 1 1 0 6H9Z" />
                        </svg>
                      </IconButton>
                      <IconButton>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m5-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </IconButton>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  <div className="space-y-4">
                    {loadingMessages ? ( <div className="flex justify-center py-10">
                        <p className="text-gray-500 text-lg">Loading Conversation...</p>
                    </div>) : (
                        <>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender_id === currentUser.id? "justify-end": "justify-start"}`}>
                                <div className={`max-w-[80%] rounded-[28px] px-4 py-3 shadow-sm md:max-w-[65%]
                                ${msg.sender_id === currentUser.id? "rounded-br-md bg-blue-600 text-white": "rounded-bl-md bg-white border border-slate-200 text-slate-800"}`}>
                                    <p>{msg.message}</p>
                                    <p className={`mt-2 text-xs ${msg.sender_id === currentUser.id? "text-blue-100": "text-slate-400"}`}>
                                        {new Date(msg.created_at).toLocaleTimeString([], {
                                            hour: "2-digit",minute: "2-digit"})}
                                    </p>
                            </div>
                    </div>))}
                    <div ref={bottomRef}></div>
                    </>)}
                  </div>
                </div>
                {/* Input Area */}
                <div className="border-t border-slate-200 bg-white p-4 md:p-5">
                  <div className="flex items-end gap-3 rounded-[28px] border border-slate-200 bg-slate-50 p-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                    <div className="flex gap-2">
                      <IconButton>
                        <span className="text-lg">😊</span>
                      </IconButton>
                      <IconButton>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14" />
                        </svg>
                      </IconButton>
                    </div>

                    <textarea
                      value={message}
                      onKeyDown={(e)=>{
                        if(e.key==="Enter" && !e.shiftKey){
                            e.preventDefault();
                            handleSend();
                        }}}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a message..."
                      rows={1}
                      className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
                    />

                    <button
                      onClick={handleSend}
                      className="flex h-11 items-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 11.5 21 3l-8.5 18-2.5-7-7-2.5Z" />
                      </svg>
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex flex-1 items-center justify-center p-6">
                <div className="max-w-md text-center">
                  <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-4xl bg-blue-50 shadow-[0_12px_30px_rgba(59,130,246,0.10)]">
                    <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h8M8 14h5m-9 5.5V5.75A1.75 1.75 0 0 1 6.75 4h10.5A1.75 1.75 0 0 1 19 5.75v11.5A1.75 1.75 0 0 1 17.25 19H9.5L5 20.5v-1.5Z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                    Select a conversation
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Choose a client or freelancer from the left panel to start messaging in a clean, professional workspace.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}