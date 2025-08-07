export default function useSpeech() {
  return (text) => {
    if ("speechSynthesis" in window) {
      const u = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(u);
    }
  };
}
