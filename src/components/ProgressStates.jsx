import React from 'react';
import { PieChart, Pie, Label, ResponsiveContainer } from 'recharts';

export default function ProgressStates({ completedCount = 0, totalQuizzes = 10 }) {
    
    // حساب عدد الكويزات المتبقية ديناميكياً
    const remainingQuizzes = totalQuizzes - completedCount >= 0 ? totalQuizzes - completedCount : 0;

    // تجهيز البيانات الحية للشارت بناءً على الإحصائيات الفعالة
    const data = [
        { name: 'Completed', value: completedCount, fill: '#4E7355' }, // اللون الأخضر الأساسي للتطبيق
        { name: 'Remaining', value: remainingQuizzes, fill: '#6BB68333' }, // الأخضر الشفاف للخلفية المتبقية
    ];

    // حساب النسبة المئوية بدقة
    const total = completedCount + remainingQuizzes;
    const percentage = total > 0 ? ((completedCount / total) * 100).toFixed(0) : 0;

    return (
        <div
            className="flex flex-wrap w-full max-w-[350px] min-h-[300px] p-2.5 justify-around items-stretch"
        >
            <div className="w-[33%] flex-1 flex-shrink-0 basis-[200px] aspect-square h-[calc(100%-20px)]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius="80%"
                            innerRadius="60%"
                            isAnimationActive={true}
                            strokeWidth={0}
                            startAngle={90} // لجعل الشارت يبدأ الرسم من الأعلى باتجاه عقارب الساعة
                            endAngle={-270}
                        />
                        {/* الـ Label تم تعديل الـ fill الخاص به ليتكيف تلقائياً:
                          "currentColor" تعني أنه سيأخذ لون النص الخاص بالأب (أسود في الفاتح، وأبيض في الداكن)
                        */}
                        <Label 
                            position="center" 
                            fill="currentColor" 
                            className="text-slate-800 dark:text-zinc-100 font-bold text-lg"
                        >
                            {`${percentage}%`}
                        </Label>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}