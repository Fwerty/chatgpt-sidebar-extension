if (!document.getElementById("chatgpt-yan-panel")) {
    const panel = document.createElement("div");
    panel.id = "chatgpt-yan-panel";
  
    panel.innerHTML = `
      <style>
    #mesajlar::-webkit-scrollbar {
      width: 6px;
    }
    #mesajlar::-webkit-scrollbar-track {
      background: #2a2a2a;
    }
    #mesajlar::-webkit-scrollbar-thumb {
      background-color: #555;
      border-radius: 3px;
    }
    #mesajlar::-webkit-scrollbar-thumb:hover {
      background-color: #777;
    }
  </style>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #1f1f1f; color: white; font-family: 'Segoe UI', sans-serif; border-top-left-radius: 12px;">
        <span style="font-size: 16px;">📝 Messages</span>
        <button id="kapat-btn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">✕</button>
      </div>
      <div id="mesajlar" style="padding: 16px; color: #ccc; font-family: 'Segoe UI', sans-serif; font-size: 14px; overflow-y: auto; max-height: 70vh;"></div>
    `;
  
    Object.assign(panel.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      width: "300px",
      backgroundColor: "#2a2a2a",
      boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
      borderRadius: "12px",
      zIndex: "999999",
      overflow: "hidden",
      transition: "opacity 0.3s ease",
      opacity: "1"
    });
  
    document.body.appendChild(panel);
  
    document.getElementById("kapat-btn").onclick = () => {
      panel.style.opacity = "0";
      setTimeout(() => panel.remove(), 300);
    };
  
    const tumKutular = document.querySelectorAll("div.relative");
    const mesajKutulari = Array.from(tumKutular).filter(div =>
      div.classList.contains("bg-token-message-surface") &&
      div.querySelector(".whitespace-pre-wrap")
    );
  
    const mesajlarDiv = document.getElementById("mesajlar");
  
    mesajKutulari.forEach((kutu, index) => {
      const icerikDiv = kutu.querySelector(".whitespace-pre-wrap");
      if (icerikDiv && icerikDiv.innerText.trim()) {
        const mesajDiv = document.createElement("div");
        mesajDiv.textContent = icerikDiv.innerText;
        mesajDiv.style.marginBottom = "12px";
        mesajDiv.style.padding = "10px";
        mesajDiv.style.background = "#3a3a3a";
        mesajDiv.style.borderRadius = "8px";
        mesajDiv.style.cursor = "pointer";
        mesajDiv.style.transition = "background 0.2s";

        // 👇 Satır sınırlama için eklenen stiller
mesajDiv.style.display = "-webkit-box";
mesajDiv.style.webkitBoxOrient = "vertical";
mesajDiv.style.overflow = "hidden";
mesajDiv.style.textOverflow = "ellipsis";
mesajDiv.style.webkitLineClamp = "4";


        mesajDiv.onmouseenter = () => mesajDiv.style.background = "#4a4a4a";
        mesajDiv.onmouseleave = () => mesajDiv.style.background = "#3a3a3a";
  
        // ✅ Tıklayınca scroll et
        mesajDiv.onclick = () => {
          kutu.scrollIntoView({ behavior: "smooth", block: "center" });
          kutu.style.boxShadow = "0 0 0 3px #00bfff"; // vurgu
          setTimeout(() => {
            kutu.style.boxShadow = ""; // vurgu kalksın
          }, 1500);
        };
  
        mesajlarDiv.appendChild(mesajDiv);
      }
    });


    mesajlarDiv.scrollTop = mesajlarDiv.scrollHeight;

  }
  