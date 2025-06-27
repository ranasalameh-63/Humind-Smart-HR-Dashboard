import { useEffect, useState } from "react";
import axios from "axios";
import { X, User } from 'lucide-react';
import PerformanceTimeline from "./PerformanceChart";
import StrengthsWeaknesses from "./StrengthsWeaknesses";
import PeerComparison from "./PeerComparison";
import TrainingSuggestions from "./TrainingSuggestions";


export default function PerformanceDetailsModal({ employee, onClose }) {
  const [timeline, setTimeline] = useState([]);
  const [strengthsWeaknesses, setStrengthsWeaknesses] = useState({ strengths: [], weaknesses: [] });
  const [peerComparison, setPeerComparison] = useState([]);
  const [trainingSuggestions, setTrainingSuggestions] = useState([]);

  useEffect(() => {
    if (!employee) return;

    const fetchTimeline = axios.get(`http://localhost:9000/api/performance/timeline/${employee._id}`);
    const fetchStrengthsWeaknesses = axios.get(`http://localhost:9000/api/performance/strengths-weaknesses/${employee._id}`);
    const fetchPeerComparison = axios.get(`http://localhost:9000/api/performance/compare/${employee._id}`);
    const fetchTrainingSuggestions = axios.get(`http://localhost:9000/api/performance/training/${employee._id}`);

    Promise.all([fetchTimeline, fetchStrengthsWeaknesses, fetchPeerComparison, fetchTrainingSuggestions])
      .then(([timelineRes, swRes, peersRes, trainingRes]) => {
        setTimeline(timelineRes.data);
        setStrengthsWeaknesses(swRes.data);
        setPeerComparison(peersRes.data);
        setTrainingSuggestions(trainingRes.data.suggestions);
      })
      .catch(err => {
        console.error("Failed to fetch performance details", err);
      });
  }, [employee]);


  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/40 via-purple-900/20 to-black/20 backdrop-blur-[1px] flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl relative border border-white/20 transform animate-slideUp">
    <div className="bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] p-6 text-white relative overflow-hidden mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{employee.name}</h2>
                <p className="text-white/80 text-sm">Performance Details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm group"
            >
              <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        <section className="mb-6">
          <h3 className="font-semibold mb-2">Performance Timeline</h3>
          <PerformanceTimeline timeline={timeline} />
        </section>

        <section className="mb-6">
          <h3 className="font-semibold mb-2">Strengths & Weaknesses</h3>
          <StrengthsWeaknesses strengthsWeaknesses={strengthsWeaknesses} />
        </section>

        <section className="mb-6">
          <h3 className="font-semibold mb-2">Peer Comparison</h3>
          <PeerComparison peerComparison={peerComparison} currentEmployeeName={employee.name} />
        </section>

        <section className="mb-6">
          <h3 className="font-semibold mb-2">Training Suggestions</h3>
          <TrainingSuggestions trainingSuggestions={trainingSuggestions} />
        </section>

        <button
          onClick={onClose}
          className="mt-4 bg-[#3B1E54] text-white px-4 py-2 rounded hover:bg-[#9B7EBD] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
