import { useEffect, useState } from "react";
import axios from "axios";
import PerformanceTimeline from "./PerformanceChart";
import StrengthsWeaknesses from "./StrengthsWeaknesses";
import PeerComparison from "./PeerComparison";
import TrainingSuggestions from "./TrainingSuggestions";
import AddPerformanceForm from "./PerformanceForm";


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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white rounded-lg w-[90vw] max-w-4xl p-6 overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold mb-4 text-[#3B1E54]">{employee.name} - Performance Details</h2>

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
