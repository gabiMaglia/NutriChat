import { CreateMLCEngine } from "@mlc-ai/web-llm";

const useEngine = () => {
  const createEngine = async () => {
    const selectedModel = "TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC";
    const engine = await CreateMLCEngine(
      selectedModel,
      { initProgressCallback: initProgressCallback } // engineConfig
    );
    return engine;
  };
  const engine = createEngine();
  return engine;
};

export default useEngine;
