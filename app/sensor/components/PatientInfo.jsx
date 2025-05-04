import React from 'react';
import { User, Clock } from 'lucide-react';

const PatientInfo = ({ patientId, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleString();
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mt-4 border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 dark:bg-indigo-900 p-2.5 rounded-full">
            <User className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Patient ID</div>
            <div className="font-semibold text-slate-900 dark:text-white">{patientId}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-100 dark:bg-emerald-900 p-2.5 rounded-full">
            <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Last Updated</div>
            <div className="font-semibold text-slate-900 dark:text-white">{formattedTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;