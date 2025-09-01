const DB_STORAGE_KEY = 'nameModifierDatabase';

// --- State for non-repeating random selection ---
let eligibleRecords = [];
let availableIndices = [];
let databaseContentCache = null; // Cache the DB content to avoid re-parsing unnecessarily

// --- Helper Functions ---

// Helper to check password for sensitive actions
function checkPassword() {
    const pass = prompt("Para esta ação, por favor, digite a senha:");
    if (pass === '019026') {
        return true;
    } else if (pass !== null) { // User didn't click cancel
        alert("Senha incorreta.");
    }
    return false;
}

// Helper to update the stats panel UI
function updateStatsPanel() {
    const validCountEl = document.getElementById('valid-names-count');
    const availableCountEl = document.getElementById('available-names-count');

    if (validCountEl && availableCountEl) {
        validCountEl.textContent = eligibleRecords.length;
        availableCountEl.textContent = availableIndices.length;
    }
}

// Helper to format name (similar logic to modificarNome)
function formatName(name) {
    if (!name) return "";
    const partesDoNome = name.trim().split(/\s+/);
    return partesDoNome.map(parte => {
        if (!parte) return "";
        const lowerPart = parte.toLowerCase();
        // Keep common prepositions/articles lowercase
        if (["de", "da", "do", "das", "dos", "e"].includes(lowerPart)) {
            return lowerPart;
        }
        // Capitalize first letter, lowercase rest
        return parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase();
    }).filter(Boolean).join(" "); // Filter out empty strings and join
}

function extractBirthYear(dobString) {
    // Expects format DD/MM/YYYY
    if (!dobString) return null;
    const parts = dobString.split('/');
    if (parts.length === 3) {
        const year = parseInt(parts[2], 10);
        return isNaN(year) ? null : year;
    }
    // Try YYYY-MM-DD or other formats if needed
    return null;
}

function parseDatabaseText(text) {
    const records = [];
    // Split into potential records - assuming '-> ' marks the start of a new record
    // Also handle potential empty strings from splitting
    const potentialRecords = text.split('-> ').filter(r => r && r.trim() !== '');

    potentialRecords.forEach(recordText => {
        const record = { nome: null, cpf: null, dob: null, sexo: null, raw: recordText };
        const lines = recordText.trim().split('\n');

        lines.forEach(line => {
            line = line.trim();
            if (record.nome === null && line.match(/nome:/i)) {
                record.nome = line.substring(line.toLowerCase().indexOf('nome:') + 'nome:'.length).trim();
            } else if (record.cpf === null && line.match(/cpf:/i)) {
                record.cpf = line.substring(line.toLowerCase().indexOf('cpf:') + 'cpf:'.length).trim();
            } else if (record.dob === null && (line.match(/data de nascimento:/i) || line.match(/nascimento:/i) )) {
                let label = line.match(/data de nascimento:/i) ? 'data de nascimento:' : 'nascimento:';
                record.dob = line.substring(line.toLowerCase().indexOf(label) + label.length).trim();
            } else if (record.sexo === null && line.match(/sexo:/i)) {
                record.sexo = line.substring(line.toLowerCase().indexOf('sexo:') + 'sexo:'.length).trim();
            }
            // Stop if all needed fields are found for efficiency
            if (record.nome !== null && record.cpf !== null && record.dob !== null && record.sexo !== null) {
                // Could break loop here if performance is critical, but parsing all lines is safer
            }
        });

        // Add record if essential fields for filtering (nome, cpf, dob) were found
        if (record.nome && record.cpf && record.dob) {
            records.push(record);
        } else {
             console.warn("Skipping record due to missing Nome, CPF, or Data de Nascimento:", record.raw);
        }
    });
    return records;
}

function prepareEligibleRecords(forceReparse = false) {
    try {
        const currentDbData = localStorage.getItem(DB_STORAGE_KEY);

        // Reparse if forced, or if data is missing, or if data has changed
        if (forceReparse || !currentDbData || currentDbData !== databaseContentCache) {
            console.log("Database changed or first load. Parsing and filtering...");
            databaseContentCache = currentDbData; // Update cache

            if (!currentDbData) {
                eligibleRecords = [];
            } else {
                const allRecords = parseDatabaseText(currentDbData);
                console.log(`Parsed ${allRecords.length} potential records.`);

                eligibleRecords = allRecords.filter(record => {
                    const birthYear = extractBirthYear(record.dob);
                    // Filter by birth year range (1974-2004 inclusive)
                    return birthYear !== null && birthYear >= 1974 && birthYear <= 2004;
                });
                console.log(`Found ${eligibleRecords.length} eligible records (Birth Year 1974-2004).`);
            }
            // Reset available indices whenever eligible records are recalculated
            availableIndices = eligibleRecords.map((_, index) => index);
             if (eligibleRecords.length === 0) {
                 console.warn("No eligible records found in the database based on the criteria.");
             }

        } else if (availableIndices.length === 0 && eligibleRecords.length > 0) {
             // Data hasn't changed, but we've used all names in the current cycle. Reset indices.
             console.log("Resetting available indices for a new cycle.");
             availableIndices = eligibleRecords.map((_, index) => index);
        }
        // If data hasn't changed and indices are available, do nothing.

        // Always update the UI after preparing records
        updateStatsPanel();

    } catch (e) {
        console.error("Error processing database data:", e);
        eligibleRecords = [];
        availableIndices = [];
        databaseContentCache = null; // Clear cache on error
        updateStatsPanel(); // Reset UI on error too
        alert('Erro ao processar os dados do banco.');
    }
}

// --- Name Modifier Functions ---
export async function modificarNome() {
  const nomeCompleto = document.getElementById("nomeInput").value;
  const resultadoDiv = document.getElementById("resultado");
  if (!resultadoDiv) return;

  const nomeModificado = formatName(nomeCompleto); // Use helper function

  // Exibir o resultado - Clear previous content first
  resultadoDiv.innerHTML = ''; // Clear previous results including buttons

  if (nomeModificado) { // Only display and add button if there's a result
      const textNode = document.createTextNode(nomeModificado + ' '); // Add space before button
      resultadoDiv.appendChild(textNode);

      // Copy to clipboard automatically and add copy button
      try {
        await navigator.clipboard.writeText(nomeModificado);
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copiar'; // Initial state
        copyButton.onclick = async () => {
          try {
              await navigator.clipboard.writeText(nomeModificado);
              copyButton.textContent = 'Copiado!';
               setTimeout(() => {
                   copyButton.textContent = 'Copiar';
               }, 1500);
          } catch (copyErr) {
               console.error('Falha ao copiar novamente: ', copyErr);
               copyButton.textContent = 'Falha!';
                setTimeout(() => {
                   copyButton.textContent = 'Copiar';
               }, 1500);
          }
        };
        resultadoDiv.appendChild(copyButton);
      } catch (err) {
        console.error('Falha ao copiar automaticamente: ', err);
        const errorMsg = document.createElement('span');
        errorMsg.textContent = ' (Falha ao copiar auto)';
        errorMsg.style.color = 'red';
        errorMsg.style.fontSize = '0.8em';
        resultadoDiv.appendChild(errorMsg);
      }
  } else {
      resultadoDiv.textContent = ''; // Ensure it's empty if input was empty/whitespace
  }
}

export function resetNome() {
  document.getElementById("nomeInput").value = "";
  const resultadoDiv = document.getElementById("resultado");
   if (resultadoDiv) {
       resultadoDiv.innerHTML = ""; // Clear the result area completely
   }
}

// --- Database Functions ---

function toggleDatabase() {
    const dbSection = document.getElementById('database-section');
    if (dbSection) {
        dbSection.style.display = dbSection.style.display === 'none' ? 'block' : 'none';
    }
}

function saveData() {
    const dbInput = document.getElementById('db-input');
    if (dbInput) {
        const newData = dbInput.value; // Get the new data to add
        if (newData.trim()) { // Check if there is new data to save
            try {
                window.saveHistoryState(); // Save state before changing
                const existingData = localStorage.getItem(DB_STORAGE_KEY) || '';
                
                // If there's existing data, add a separator before appending the new data.
                // The parser uses "-> " to separate records.
                const separator = '\n\n-> ';
                const combinedData = existingData.trim() ? existingData + separator + newData : newData;

                localStorage.setItem(DB_STORAGE_KEY, combinedData);
                loadData(); // Refresh display with combined data
                prepareEligibleRecords(true); // Force re-parsing after save
                alert('Dados adicionados com sucesso!');
                dbInput.value = ''; // Clear input after saving
            } catch (e) {
                console.error("Erro ao salvar no localStorage:", e);
                alert('Erro ao salvar os dados. O armazenamento pode estar cheio ou indisponível.');
            }
        } else {
            alert('Nada para salvar. Por favor, cole algum texto.');
        }
    }
}

function loadData() {
    const displayArea = document.getElementById('stored-data-display');
    if (displayArea) {
        try {
            const savedData = localStorage.getItem(DB_STORAGE_KEY);
            displayArea.innerHTML = ''; // Clear previous content

            if (!savedData || savedData.trim() === '') {
                 displayArea.textContent = 'Nenhum dado salvo ainda.';
            } else {
                const records = savedData.split('\n\n-> ');
                records.forEach((recordText, index) => {
                    if (recordText.trim() === '') return;

                    const recordItem = document.createElement('div');
                    recordItem.className = 'db-record-item';

                    const textElement = document.createElement('pre');
                    textElement.className = 'db-record-text';
                    textElement.textContent = recordText;

                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'db-record-delete-btn';
                    deleteBtn.innerHTML = '&times;'; // A red 'X'
                    deleteBtn.title = 'Excluir este registro';
                    deleteBtn.onclick = () => deleteRecord(index);

                    recordItem.appendChild(textElement);
                    recordItem.appendChild(deleteBtn);
                    displayArea.appendChild(recordItem);
                });
            }

            // Prepare records which will also update the stats panel.
            // Using false to avoid re-parsing if data hasn't changed.
            prepareEligibleRecords(false);
        } catch (e) {
            console.error("Erro ao carregar do localStorage:", e);
            displayArea.textContent = 'Erro ao carregar dados.';
        }
    }
}

function clearData() {
    if (confirm('Tem certeza que deseja limpar todos os dados salvos?')) {
        try {
            window.saveHistoryState(); // Save state before changing
            localStorage.removeItem(DB_STORAGE_KEY);
            loadData(); // Refresh display
            prepareEligibleRecords(true); // Force update after clear
            alert('Banco de dados limpo.');
        } catch (e) {
            console.error("Erro ao limpar localStorage:", e);
            alert('Erro ao limpar os dados.');
        }
    }
}

// Function to delete a single record by its index
function deleteRecord(indexToDelete) {
    if (!checkPassword()) {
        return;
    }
    
    window.saveHistoryState(); // Save state before changing

    try {
        const savedData = localStorage.getItem(DB_STORAGE_KEY) || '';
        const records = savedData.split('\n\n-> ');

        // Remove the record at the specified index
        records.splice(indexToDelete, 1);

        // Join the remaining records back together
        const newData = records.join('\n\n-> ');

        localStorage.setItem(DB_STORAGE_KEY, newData);

        loadData(); // Refresh the display
        prepareEligibleRecords(true); // Force re-parsing and update stats
        alert('Registro excluído com sucesso!');

    } catch (e) {
        console.error("Erro ao excluir o registro:", e);
        alert('Ocorreu um erro ao tentar excluir o registro.');
    }
}

// --- Complement Modifier Functions ---
const complementAbbreviations = {
    'condominio': ['Cond.', 'CDM', 'Cod.'],
    'condomínio': ['Cond.', 'CDM', 'Cod.'], // Handle accented version
    'residencial': ['Res.', 'Resid.'],
    'apartamento': ['Apto.', 'Ap.'],
    'apto': ['Apto.', 'Ap.'],
    'bloco': ['Bl.', 'B.'],
    'fase': ['Fs.', 'F.'],
    'entregar': ['Entr.', 'Entregar P/', 'P/'],
    'para': ['Pra', 'Pro', 'P/'],
    'casa': ['Cs.', 'C.'],
    'numero': ['N.', 'Num.'],
    'número': ['N.', 'Num.'],
    // Add more as needed
};

const complementPunctuation = ['/', ',', ';', '.', '(', ')'];

export function createSingleComplementVariation(originalText) {
    if (!originalText || !originalText.trim()) {
        return originalText; // Return original text if it's empty or just whitespace
    }

    // Reusing logic from generateComplementoVariations
    const words = originalText.trim().split(/(\s+)/); // Split by whitespace, keeping delimiters
    let currentVariation = [];
    let openParen = false; // Track parentheses balance

    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        // Skip whitespace delimiters
        if (word.match(/^\s+$/)) {
            continue;
        }

        let processedWord = '';

        // Handle existing punctuation at the end of a word before processing
        let trailingPunct = '';
        const punctMatch = word.match(/[.,;()\/\-]+$/);
        if (punctMatch) {
            trailingPunct = punctMatch[0];
            word = word.substring(0, word.length - trailingPunct.length);
        }

        const lowerWord = word.toLowerCase();

        // 1. Check for abbreviation
        if (word && complementAbbreviations[lowerWord]) {
            const possibleAbbr = complementAbbreviations[lowerWord];
            processedWord = possibleAbbr[Math.floor(Math.random() * possibleAbbr.length)];
        }
        // 2. Check for number padding
        else if (word && /^\d+$/.test(word)) {
            const numZeros = Math.floor(Math.random() * 3); // 0 to 2 leading zeros
            processedWord = '0'.repeat(numZeros) + word;
        }
        // 3. Default: Capitalize first letter
        else if (word) {
             processedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
            processedWord = ''; // Handle potential empty strings
        }

        // Add back original trailing punctuation if it existed
        processedWord += trailingPunct;

        if (processedWord) {
            currentVariation.push(processedWord);
        }
    }

    // Join with random punctuation
    let resultString = '';
    for(let i = 0; i < currentVariation.length; i++) {
        resultString += currentVariation[i];
        if (i < currentVariation.length - 1) {
            let randomPunctIndex = Math.floor(Math.random() * complementPunctuation.length);
            let randomPunct = complementPunctuation[randomPunctIndex];

            // Basic parenthesis balancing
            if (randomPunct === '(' && openParen) randomPunct = ',';
            if (randomPunct === ')' && (!openParen || i === 0)) randomPunct = '.';
            if (randomPunct === '(') openParen = true;
            if (randomPunct === ')' && openParen) openParen = false;

            resultString += randomPunct;
        }
    }
     // Ensure any open parenthesis is closed at the end
    if (openParen) {
        resultString += ')';
    }

    return resultString.trim();
}

export function generateComplementoVariations() {
    const originalText = document.getElementById('complementoOriginal').value;
    const count = parseInt(document.getElementById('complementoCount').value, 10);
    const outputDiv = document.getElementById('complementoOutput');
    outputDiv.innerHTML = ''; // Clear previous results

    if (!originalText || !originalText.trim()) {
        outputDiv.innerHTML = '<p style="color: grey; text-align: center;">Por favor, insira o texto do complemento.</p>';
        return;
    }

    if (isNaN(count) || count < 1 || count > 50) { // Added upper limit
         outputDiv.innerHTML = '<p style="color: red; text-align: center;">Quantidade inválida (1-50).</p>';
         return;
    }

    const generatedVariations = new Set();
    let attempts = 0;
    const maxAttempts = count * 20; // Allow more attempts to find unique variations

    while (generatedVariations.size < count && attempts < maxAttempts) {
        attempts++;
        const newVariation = createSingleComplementVariation(originalText);
        if (newVariation) {
            generatedVariations.add(newVariation);
        }
    }

    if (generatedVariations.size === 0) {
         outputDiv.innerHTML = '<p style="color: red; text-align: center;">Não foi possível gerar variações.</p>';
         return;
    }

    let variationIndex = 1;
    generatedVariations.forEach(variation => {
        const variationDiv = document.createElement('div');
        variationDiv.classList.add('variation'); // Reuse address generator style

        const textSpan = document.createElement('span');
        textSpan.textContent = `${variationIndex++}) ${variation}`;

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copiar';
        // Use an arrow function to correctly capture the 'variation' variable for each button
        copyButton.onclick = () => copyComplementoVariation(copyButton, variation);

        variationDiv.appendChild(textSpan);
        variationDiv.appendChild(copyButton);
        outputDiv.appendChild(variationDiv);
    });

     if (generatedVariations.size < count) {
        const warning = document.createElement('p');
        warning.style.color = 'orange';
        warning.style.fontSize = '0.9em';
        warning.style.marginTop = '10px';
        warning.textContent = `Aviso: Gerado ${generatedVariations.size} variações únicas (solicitado ${count}).`;
        outputDiv.appendChild(warning);
    }
}

export async function copyComplementoVariation(buttonElement, text) {
    try {
        await navigator.clipboard.writeText(text);

        // Clear the original complement input field as requested
        const complementoInput = document.getElementById('complementoOriginal');
        if (complementoInput) {
            complementoInput.value = '';
        }
        
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'Copiado!';
        buttonElement.disabled = true;
        setTimeout(() => {
            // Check if the button still exists before updating
            if (buttonElement) {
                buttonElement.textContent = originalText;
                buttonElement.disabled = false;
            }
        }, 1500);
    } catch (err) {
        console.error('Falha ao copiar variação do complemento: ', err);
         if (buttonElement) {
            buttonElement.textContent = 'Falha!';
             // Keep disabled briefly on failure too?
             setTimeout(() => {
                if (buttonElement) {
                     buttonElement.textContent = 'Copiar';
                     buttonElement.disabled = false; // Re-enable after failure indication
                }
             }, 1500);
         }
        // Optionally alert the user
        // alert('Falha ao copiar a variação.');
    }
}

// --- New Name Function ---
export async function getNewName(isRobotCall = false) { // Add parameter to control UI feedback
    prepareEligibleRecords(); // Ensure records are parsed/filtered & indices are ready

    if (eligibleRecords.length === 0) {
        if (!isRobotCall) { // Don't show alert for robot calls, return null instead
             alert('Nenhum nome elegível (nascido entre 1974 e 2004) encontrado/processado no banco de dados. Verifique o conteúdo e o formato.');
        }
        return null;
    }

    if (availableIndices.length === 0) {
        if (!isRobotCall) {
            alert('Todos os nomes elegíveis foram usados neste ciclo. Clique novamente para reiniciar.');
        }
        prepareEligibleRecords(); // This will reset indices if eligibleRecords > 0
         if (availableIndices.length === 0) {
             if (!isRobotCall) {
                 alert('Não há nomes elegíveis disponíveis.');
             }
             return null;
         }
    }

    // Select a random index from the available ones
    const randomIndexInAvailable = Math.floor(Math.random() * availableIndices.length);
    // Get the actual index in the eligibleRecords array
    const actualRecordIndex = availableIndices[randomIndexInAvailable];

    // Remove the used index from available list for this cycle
    availableIndices.splice(randomIndexInAvailable, 1);
    
    // Update the UI after removing an index
    updateStatsPanel();

    // Get the selected record
    const selectedRecord = eligibleRecords[actualRecordIndex];

    // Format the name and output string
    const formattedNamePart = formatName(selectedRecord.nome);
    const cpfPart = selectedRecord.cpf;
    const sexoPart = selectedRecord.sexo ? selectedRecord.sexo.trim() : 'N/I'; // N/I for "Não Informado" or use 'N/A'
    const dobPart = selectedRecord.dob; // Already parsed from "Data de Nascimento:" or "Nascimento:"

    // New output format: CPF: ... • NOME: ... • SEXO: ... • NASCIMENTO: ...
    const outputString = `CPF: ${cpfPart} • NOME: ${formattedNamePart} • SEXO: ${sexoPart} • NASCIMENTO: ${dobPart}`;

    // If called by the robot, just return the string.
    if (isRobotCall) {
        return outputString;
    }

    // Copy to clipboard and provide feedback
    const buttonElement = document.getElementById('get-new-name-button');
    try {
        await navigator.clipboard.writeText(outputString);
        console.log(`Copied (${availableIndices.length} remaining): ${outputString}`);
        if (buttonElement) {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = 'Copiado!';
            buttonElement.disabled = true;
            setTimeout(() => {
                buttonElement.textContent = originalText;
                buttonElement.disabled = false;
            }, 1500);
        }
    } catch (err) {
        console.error('Falha ao copiar nome/CPF/sexo/nascimento: ', err);
        alert('Falha ao copiar os dados gerados.');
        if (buttonElement) {
            const originalText = 'Novo Nome'; 
             buttonElement.textContent = 'Falha!';
             buttonElement.disabled = true; 
              setTimeout(() => {
                buttonElement.textContent = originalText;
                buttonElement.disabled = false;
             }, 1500);
         }
    }
}

// --- Initialization for Name Modifier ---
export function initNameModifier() {
    // Attach listeners for DB buttons
    const toggleBtn = document.getElementById('db-toggle-button');
    const saveBtn = document.getElementById('db-save-button');
    const clearBtn = document.getElementById('db-clear-button');
    // No need to attach listener for get-new-name-button here, it's done via onclick in HTML

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleDatabase);
    }
    if (saveBtn) {
        saveBtn.addEventListener('click', saveData);
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', clearData);
    }

    // Load initial data into display
    loadData();
    // Initial parse/filter can be deferred until the first getNewName click
    // prepareEligibleRecords(); // Optional: Pre-process on load

    // Add keypress listener to input field
     const nameInput = document.getElementById('nomeInput');
     if (nameInput) {
         nameInput.addEventListener('keypress', async (event) => {
             if (event.key === 'Enter') {
                 event.preventDefault(); // Prevent form submission if applicable
                 await modificarNome(); // Await if the function is async
             }
         });
     }

    // Attach listeners for Complement Modifier
    const complementoInput = document.getElementById('complementoOriginal');
    const complementoCountInput = document.getElementById('complementoCount');
    const gerarComplementoBtn = document.getElementById('gerarComplementoBtn');

    if (gerarComplementoBtn) {
        gerarComplementoBtn.addEventListener('click', generateComplementoVariations);
    }

    const handleComplementoEnter = (event) => {
          if (event.key === 'Enter' && !event.shiftKey) { // Allow Shift+Enter for newlines in textarea
            event.preventDefault(); // Prevent default Enter behavior
            generateComplementoVariations();
          }
     }

      if (complementoInput) {
          complementoInput.addEventListener('keypress', handleComplementoEnter);
      }
      if (complementoCountInput) {
          complementoCountInput.addEventListener('keypress', handleComplementoEnter);
      }
}

// --- Ball Management Functions ---
const addresses = {};
const ballMeta = {};
const lockedBalls = [];

function saveState() {
    localStorage.setItem('ballState', JSON.stringify({ addresses, ballMeta, lockedBalls }));
}

function createBalls() {
    const ballContainer = document.getElementById('ball-container');
    if (!ballContainer) return;

    ballContainer.innerHTML = '';
    Object.keys(addresses).forEach(key => {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.textContent = addresses[key];
        ball.title = ballMeta[key]?.title || 'Endereço';
        ball.onclick = () => handleBallAction(key);
        ballContainer.appendChild(ball);
    });
}

function updateRobotSequence() {
    const robotSequence = document.getElementById('robot-sequence');
    if (!robotSequence) return;

    robotSequence.innerHTML = '';
    Object.keys(ballMeta).forEach(key => {
        const sequenceItem = document.createElement('div');
        sequenceItem.className = 'sequence-item';
        sequenceItem.textContent = key;
        robotSequence.appendChild(sequenceItem);
    });
}

function handleBallAction(key) {
    const action = prompt("O que deseja fazer com a bolinha \"" + key + "\"?\n\nOpções:\n1. Editar\n2. Alterar ícone\n3. Bloquear\n4. Desbloquear\n5. Excluir permanentemente\n\nDigite o número da ação desejada:");
    if (!action || isNaN(action)) {
        return;
    }

    switch (action) {
        case '1':
            { // Use block scope to keep variables local
                const currentAddress = addresses[key];
                const newAddress = prompt(`Editando endereço para a bolinha "${key}":`, currentAddress);

                if (newAddress === null) {
                    // User cancelled, do nothing.
                    return;
                }

                if (newAddress.trim() === '') {
                    alert('O endereço não pode ser vazio. A edição foi cancelada.');
                    return;
                }

                addresses[key] = newAddress;
                alert(`Bolinha "${key}" atualizada com sucesso!`);
                saveState();
                // No re-render needed for address edit alone, as it doesn't change ball appearance.
            }
            break;
        case '2':
            {
                // This case is only for black balls, so ballMeta[key] should exist
                if (ballMeta[key]) {
                    showEmojiPicker().then(emoji => {
                        if (emoji) {
                            ballMeta[key].display = emoji;
                            // Also update the title to match the new emoji for consistency
                            const titlePrompt = prompt("Digite um novo título (opcional):", ballMeta[key].title);
                            if (titlePrompt !== null) { // User didn't cancel the title prompt
                                ballMeta[key].title = titlePrompt || `Endereço ${emoji}`;
                            }
                            
                            saveState();
                            createBalls(); // Re-render to show new icon
                            updateRobotSequence(); // Update robot panel as well
                            alert('Ícone atualizado com sucesso!');
                        }
                    });
                } else {
                    alert("Metadados não encontrados para esta bolinha. Não é possível alterar o ícone.");
                }
            }
            break;
        case '3':
            if (!lockedBalls.includes(key)) {
                lockedBalls.push(key);
            }
            break;
        case '4':
            lockedBalls = lockedBalls.filter(k => k !== key);
            break;
        case '5':
            if (confirm(`Tem certeza que deseja excluir permanentemente o endereço "${key}"?`)) {
                delete addresses[key];
                if (ballMeta[key]) delete ballMeta[key];
                lockedBalls = lockedBalls.filter(k => k !== key);
            } else {
                return; // Do not save or refresh if user cancels
            }
            break;
        default:
            return;
    }
    saveState();
    createBalls(); // Re-render balls with new state
    updateRobotSequence();
}

async function handleAddNewBall() {
    if (!checkPassword()) return;

    const color = prompt("Qual a cor da nova bolinha?\n(Digite 'azul' ou 'preta')")?.toLowerCase();

    let newKey, newBallMeta = {};

    if (color === 'azul') {
        newKey = prompt("Digite o número para a nova bolinha azul:");
        if (!newKey || !/^\d+$/.test(newKey) || addresses[newKey]) {
            alert("Número inválido ou já existente.");
            return;
        }
    } else if (color === 'preta') {
        const display = await showEmojiPicker(); // Use the new emoji picker
        if (!display) {
            // User cancelled the picker
            return;
        }
        // Generate a unique key for custom balls
        let i = 1;
        while (addresses[`c${i}`] || ballMeta[`c${i}`]) { i++; }
        newKey = `c${i}`;

        const title = prompt(`Digite um título para a nova bolinha "${display}":`, `Endereço ${display}`);
        if (title === null) { // User cancelled the title prompt
            return;
        }
        
        newBallMeta = { display, title: title || `Endereço ${display}` };

    } else {
        if (color !== null) { // Don't alert if user just cancelled
             alert("Cor inválida. A operação foi cancelada.");
        }
        return;
    }

    const addressText = prompt(`Cole o texto completo do endereço para a nova bolinha "${newKey}":`);
    if (addressText === null || addressText.trim() === '') {
        alert("O texto do endereço não pode ser vazio. A operação foi cancelada.");
        return;
    }

    addresses[newKey] = addressText;
    if (Object.keys(newBallMeta).length > 0) {
        ballMeta[newKey] = newBallMeta;
    }

    alert(`Bolinha "${newKey}" adicionada com sucesso!`);
    saveState();
    createBalls();
    updateRobotSequence();
}

function showEmojiPicker() {
    return new Promise(resolve => {
        const emoji = prompt("Digite o emoji para o ícone da bolinha:");
        resolve(emoji);
    });
}