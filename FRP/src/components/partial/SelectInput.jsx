import React from "react";
export default function SelectInput({
                                        label,
                                        name,
                                        OnChange,
                                        value,
                                        option1, options,
                                        type
                                    }) {
console.log(options);
    return (
        <div className="col-span-12 md:col-span-3">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">{label}</label>
            <div className="relative z-20 bg-transparent">
                <select
                    name={name}
                    value={value}
                    onChange={OnChange}
                    className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                >
                    <option value="">{option1}</option>
                    {type === "className"
                        ? options.map((option) => (
                            <option
                                key={option}
                                value={option}
                                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                            >
                                Class {option}
                            </option>
                        ))
                        : type === "subject"
                            ? options.map((subject) => (
                                <option
                                    key={subject.id}
                                    value={subject.id}
                                    className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                                >
                                    {subject.subjectName}
                                </option>
                            ))
                            : options.map((student) => (
                                <option key={student.id} value={student.id} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                                    {student.fname} {student.lname}
                                </option>
                            ))
                    }
                </select>
                <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400"><svg className="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
        </div>);
}

