import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, ActivityIndicator,
  SafeAreaView, StatusBar
} from 'react-native';

// ── Types ──
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

// ── Config ──
const ANTHROPIC_API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || '';

const SYSTEM_PROMPT = `You are GravRel's helpful AI assistant inside the GravRel mobile app.

GravRel is India's first solar-powered, DPDP-compliant cloud infrastructure platform.
Built and operated from Bhubaneswar, Odisha by Babrit Behera (Founder & CEO).

Key facts:
- 60% cheaper than AWS
- 100% solar powered, zero carbon emissions
- DPDP Act 2023 compliant from day one
- Data never leaves India (physically in Bhubaneswar)
- CEO personally reachable at ceo@gravrel.com
- UDYAM registered: UDYAM-OD-03-0020346

Services and pricing (+ 18% GST):
- Cloud VMs: Rs 199 - Rs 3,999/mo
- Managed Databases: Rs 499 - Rs 5,999/mo
- Kubernetes: Rs 999 - Rs 14,999/mo
- Object Storage: Rs 199 - Rs 999/mo
- ML/GPU Environments: Rs 999 - Rs 4,999/mo
- LLM Playground: Free / Rs 499 / Rs 999/mo

App features:
- Dashboard: live solar stats, VM overview, DPDP status
- VMs: create, start, stop, monitor virtual machines
- Billing: view invoices, manage subscription
- DPDP: compliance dashboard, green certificate
- Support: contact Babrit directly
- Profile: account settings, API keys

Current offer: 3 months FREE beta for STPI Bhubaneswar companies.

Be friendly, concise and helpful. Keep responses under 3 sentences unless more detail is needed.
If someone wants to sign up or talk to Babrit, direct them to ceo@gravrel.com.`;

// ── Quick replies ──
const QUICK_REPLIES = [
  'What is GravRel?',
  'Pricing plans',
  'Free beta offer',
  'DPDP compliance',
  'How to create a VM?',
  'Talk to Babrit',
];

// ── Time helper ──
const getTime = () => new Date().toLocaleTimeString('en-IN', {
  hour: '2-digit', minute: '2-digit'
});

// ── Message Bubble ──
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <View style={[s.msgWrap, isUser ? s.msgWrapUser : s.msgWrapBot]}>
      {!isUser && (
        <View style={s.avatar}>
          <Text style={s.avatarText}>G</Text>
        </View>
      )}
      <View style={{ maxWidth: '78%' }}>
        <View style={[s.bubble, isUser ? s.bubbleUser : s.bubbleBot]}>
          <Text style={[s.bubbleText, isUser ? s.bubbleTextUser : s.bubbleTextBot]}>
            {message.content}
          </Text>
        </View>
        <Text style={[s.time, isUser && { textAlign: 'right' }]}>
          {message.time}
        </Text>
      </View>
    </View>
  );
}

// ── Typing Indicator ──
function TypingIndicator() {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const t = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(t);
  }, []);
  return (
    <View style={s.msgWrap}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>G</Text>
      </View>
      <View style={s.bubbleBot}>
        <Text style={s.bubbleTextBot}>Thinking{dots}</Text>
      </View>
    </View>
  );
}

// ── Main Screen ──
export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! 👋 I'm GravRel's AI assistant. Ask me anything about our solar-powered cloud — pricing, services, DPDP compliance, or how to get started!",
      time: getTime(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const listRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      time: getTime(),
    };

    const newHistory = [...history, { role: 'user', content: text.trim() }];
    setMessages(prev => [...prev, userMsg]);
    setHistory(newHistory);
    setLoading(true);
    scrollToBottom();

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          messages: newHistory,
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text ||
        "I'm having trouble connecting. Please email ceo@gravrel.com directly.";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        time: getTime(),
      };

      setMessages(prev => [...prev, botMsg]);
      setHistory(prev => [...prev, { role: 'assistant', content: reply }]);

    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting. Please email ceo@gravrel.com or try again shortly.",
        time: getTime(),
      };
      setMessages(prev => [...prev, errMsg]);
    }

    setLoading(false);
    scrollToBottom();
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1628" />

      {/* Header */}
      <View style={s.header}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>G</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.headerName}>GravRel Assistant</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={s.onlineDot} />
            <Text style={s.headerStatus}>Solar-powered · Always online</Text>
          </View>
        </View>
        <Text style={s.headerBadge}>☀️ AI</Text>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={s.list}
          renderItem={({ item }) => <MessageBubble message={item} />}
          ListFooterComponent={loading ? <TypingIndicator /> : null}
          onContentSizeChange={scrollToBottom}
        />

        {/* Quick replies */}
        {messages.length <= 2 && !loading && (
          <View style={s.quickWrap}>
            <FlatList
              horizontal
              data={QUICK_REPLIES}
              keyExtractor={item => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={s.chip} onPress={() => send(item)}>
                  <Text style={s.chipText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Input */}
        <View style={s.inputWrap}>
          <TextInput
            style={s.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask about GravRel..."
            placeholderTextColor="#4A6F8A"
            multiline
            maxLength={500}
            onSubmitEditing={() => send(input)}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[s.sendBtn, (!input.trim() || loading) && { opacity: 0.5 }]}
            onPress={() => send(input)}
            disabled={!input.trim() || loading}
          >
            {loading
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={s.sendIcon}>↑</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={s.footer}>
          Powered by GravRel AI · gravrel.com · Bhubaneswar
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0A1628' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 16, paddingTop: 20,
    backgroundColor: '#0D2137',
    borderBottomWidth: 1, borderBottomColor: 'rgba(29,158,117,0.15)',
  },
  headerName: { fontSize: 15, fontWeight: '700', color: '#fff' },
  headerStatus: { fontSize: 11, color: '#1D9E75', marginTop: 1 },
  headerBadge: { fontSize: 12, color: '#4A6F8A' },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#1D9E75' },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#1D9E75',
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: { fontSize: 14, fontWeight: '800', color: '#fff' },
  list: { padding: 16, gap: 12, paddingBottom: 8 },
  msgWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 4 },
  msgWrapUser: { justifyContent: 'flex-end' },
  msgWrapBot: { justifyContent: 'flex-start' },
  bubble: { padding: 10, borderRadius: 16, maxWidth: '100%' },
  bubbleBot: {
    backgroundColor: '#0D2137',
    borderBottomLeftRadius: 4,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    padding: 10, borderRadius: 16,
  },
  bubbleUser: { backgroundColor: '#1D9E75', borderBottomRightRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextBot: { color: 'rgba(255,255,255,0.88)' },
  bubbleTextUser: { color: '#fff' },
  time: { fontSize: 10, color: '#4A6F8A', marginTop: 3, paddingHorizontal: 4 },
  quickWrap: { paddingVertical: 8 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: 'rgba(29,158,117,0.1)',
    borderWidth: 1, borderColor: 'rgba(29,158,117,0.3)',
  },
  chipText: { fontSize: 12, fontWeight: '600', color: '#1D9E75' },
  inputWrap: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 8,
    padding: 12, paddingTop: 8,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)',
    backgroundColor: '#0D2137',
  },
  input: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12, padding: 10, paddingTop: 10,
    color: '#fff', fontSize: 14, maxHeight: 100,
  },
  sendBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: '#1D9E75',
    alignItems: 'center', justifyContent: 'center',
  },
  sendIcon: { fontSize: 18, color: '#fff', fontWeight: '700' },
  footer: {
    textAlign: 'center', fontSize: 10,
    color: '#2A4A3A', padding: 8,
    backgroundColor: '#0A1628',
  },
});
