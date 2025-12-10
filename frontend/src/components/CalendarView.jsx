import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, User } from 'lucide-react';

const CalendarView = ({ calendar, onReset }) => {
    if (!calendar) return null;

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Week {calendar.week_number} Plan</h2>
                <button
                    onClick={onReset}
                    className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    Start Over
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {calendar.posts.map((post, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        {/* Header */}
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                    {post.day}
                                </span>
                                <div className="flex items-center text-slate-500 text-sm gap-2">
                                    <span className="font-semibold text-slate-700">r/{post.subreddit}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><User size={14} /> u/{post.author}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{post.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-line">{post.content}</p>

                            {/* Comments Section */}
                            {post.comments && post.comments.length > 0 && (
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1">
                                        <MessageSquare size={14} /> Simulated Engagement
                                    </h4>
                                    <div className="space-y-4">
                                        {post.comments.map((comment, cIndex) => (
                                            <div key={cIndex} className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold flex-shrink-0">
                                                    {comment.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-700 mb-1">u/{comment.author}</div>
                                                    <p className="text-sm text-slate-600">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;
