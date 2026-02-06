'use client'

import { getUserId } from "@/app/lib/actions";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getAccessToken } from "@/app/lib/actions";
import { UserType } from "../page";
import { set } from "date-fns";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
}

const ConversationPage = () => {
    const params = useParams();
    const id = params.id as string;
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [conversation, setConversation] = useState<any>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const uid = await getUserId();
            const t = await getAccessToken();
            setUserId(uid);
            setToken(t || null);

            if (uid && t && id) {
                const data = await apiService.get(`/api/chats/${id}/`);
                setConversation(data.conversation);
                setMessages(data.messages || []);
            }
            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <main className="max-w-[1500px] mt-12 mx-auto px-6 pb-6 space-y-4">
                <p>Loading...</p>
            </main>
        );
    }

    if (!conversation) {
        return <p>Conversation not found.</p>;
    }

    if (!userId) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
                <p>You need to be authenticated to view this page.</p>
            </main>
        );
    }

    if (!token) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
                <p>Loading authentication...</p>
            </main>
        );
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <ConversationDetail 
                token={token}
                userId={userId}
                conversation={conversation}
                messages={messages}
            />
        </main>
    )
}
export default ConversationPage;