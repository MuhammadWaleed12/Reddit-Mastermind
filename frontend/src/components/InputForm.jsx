import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Sparkles } from 'lucide-react';

const InputForm = ({ onSubmit, isLoading }) => {
    const [company, setCompany] = useState({ name: 'SlideForge', description: 'AI Presentation Tool', target_audience: 'Startup founders' });
    const [personas, setPersonas] = useState([
        { name: 'Growth Hacker', description: 'Obsessed with scaling' },
        { name: 'Skeptical Dev', description: 'Hates marketing fluff' }
    ]);
    const [subreddits, setSubreddits] = useState([{ name: 'startups', description: '' }, { name: 'entrepreneur', description: '' }]);
    const [queries, setQueries] = useState(['AI tools for presentations', 'Best pitch deck software']);
    const [postsPerWeek, setPostsPerWeek] = useState(5);

    const addPersona = () => setPersonas([...personas, { name: '', description: '' }]);
    const removePersona = (index) => setPersonas(personas.filter((_, i) => i !== index));
    const updatePersona = (index, field, value) => {
        const newPersonas = [...personas];
        newPersonas[index][field] = value;
        setPersonas(newPersonas);
    };

    const addSubreddit = () => setSubreddits([...subreddits, { name: '', description: '' }]);
    const removeSubreddit = (index) => setSubreddits(subreddits.filter((_, i) => i !== index));
    const updateSubreddit = (index, value) => {
        const newSubs = [...subreddits];
        newSubs[index].name = value;
        setSubreddits(newSubs);
    };

    const addQuery = () => setQueries([...queries, '']);
    const removeQuery = (index) => setQueries(queries.filter((_, i) => i !== index));
    const updateQuery = (index, value) => {
        const newQueries = [...queries];
        newQueries[index] = value;
        setQueries(newQueries);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            company_info: company,
            personas,
            subreddits,
            queries,
            posts_per_week: postsPerWeek
        });
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 max-w-2xl mx-auto"
            onSubmit={handleSubmit}
        >
            <div className="mb-8">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                    Campaign Setup
                </h2>
                <p className="text-slate-500">Define your company and targets for the Reddit Mastermind.</p>
            </div>

            {/* Company Info */}
            <section className="mb-8 space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                    Company Info
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Company Name"
                        value={company.name}
                        onChange={(e) => setCompany({ ...company, name: e.target.value })}
                        required
                    />
                    <textarea
                        className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Description"
                        value={company.description}
                        onChange={(e) => setCompany({ ...company, description: e.target.value })}
                        required
                    />
                </div>
            </section>

            {/* Personas */}
            <section className="mb-8 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                        Personas
                    </h3>
                    <button type="button" onClick={addPersona} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        <Plus size={16} /> Add
                    </button>
                </div>
                <AnimatePresence>
                    {personas.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex gap-2"
                        >
                            <input
                                className="flex-1 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Persona Name (e.g. Growth Hacker)"
                                value={p.name}
                                onChange={(e) => updatePersona(i, 'name', e.target.value)}
                            />
                            <button type="button" onClick={() => removePersona(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </section>

            {/* Subreddits */}
            <section className="mb-8 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">3</span>
                        Target Subreddits
                    </h3>
                    <button type="button" onClick={addSubreddit} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        <Plus size={16} /> Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {subreddits.map((s, i) => (
                        <div key={i} className="flex items-center bg-slate-100 rounded-full pl-4 pr-2 py-1 border border-slate-200">
                            <span className="text-slate-600 mr-2">r/</span>
                            <input
                                className="bg-transparent border-none outline-none w-32 text-slate-800 placeholder-slate-400"
                                placeholder="subreddit"
                                value={s.name}
                                onChange={(e) => updateSubreddit(i, e.target.value)}
                            />
                            <button type="button" onClick={() => removeSubreddit(i)} className="ml-1 p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-red-500">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Queries */}
            <section className="mb-8 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">4</span>
                        Search Topics
                    </h3>
                    <button type="button" onClick={addQuery} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        <Plus size={16} /> Add
                    </button>
                </div>
                <div className="space-y-2">
                    {queries.map((q, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-2"
                        >
                            <input
                                className="flex-1 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Search Query / Topic"
                                value={q}
                                onChange={(e) => updateQuery(i, e.target.value)}
                            />
                            <button type="button" onClick={() => removeQuery(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Settings */}
            <section className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">Posts per Week: {postsPerWeek}</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={postsPerWeek}
                    onChange={(e) => setPostsPerWeek(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </section>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    'Generating Strategy...'
                ) : (
                    <>
                        Generate Calendar <Sparkles size={20} />
                    </>
                )}
            </button>
        </motion.form>
    );
};

export default InputForm;
