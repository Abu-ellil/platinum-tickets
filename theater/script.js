// State
let sections = [];
let backgroundImage = null;
let selectedSectionId = null;
let editingSection = null;
let currentTool = 'select';
let draggedItem = null;
let zoomLevel = 1;
let canvasPan = { x: 0, y: 0 };
let isPanning = false;
let panStart = { x: 0, y: 0 };

// History
const historyStack = [];
let historyIndex = -1;
const MAX_HISTORY = 50;

function saveState() {
    // Remove future states if we are in the middle of history
    if (historyIndex < historyStack.length - 1) {
        historyStack.splice(historyIndex + 1);
    }

    // Push deep copy of current sections
    historyStack.push(JSON.stringify(sections));

    // Limit stack size
    if (historyStack.length > MAX_HISTORY) {
        historyStack.shift();
    } else {
        historyIndex++;
    }

    updateUndoRedoButtons();
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        // If at end, save current state as "redo" potential before undoing? 
        // Standard undo/redo usually implies we are just traversing the stack.
        // But wait, the current live state might not be in the stack yet if we didn't save it.
        // Actually, typical implementation: initial state is index 0.

        sections = JSON.parse(historyStack[historyIndex]);

        // Clear selection if it no longer exists
        if (selectedSectionId && !sections.find(s => s.id === selectedSectionId)) {
            selectedSectionId = null;
            editingSection = null;
            resetForm();
        }

        // Re-render
        renderSections();
        renderCanvas();

        // Update storage explicitly without triggering saveState again
        localStorage.setItem('theaterBuilderData', JSON.stringify({
            theaterName: document.getElementById('theaterName').value,
            sections: sections
        }));

        updateUndoRedoButtons();
    }
}

function redo() {
    if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        sections = JSON.parse(historyStack[historyIndex]);

        renderSections();
        renderCanvas();

        localStorage.setItem('theaterBuilderData', JSON.stringify({
            theaterName: document.getElementById('theaterName').value,
            sections: sections
        }));

        updateUndoRedoButtons();
    }
}

function updateUndoRedoButtons() {
    document.getElementById('undoBtn').disabled = historyIndex <= 0;
    document.getElementById('redoBtn').disabled = historyIndex >= historyStack.length - 1;
    document.getElementById('undoBtn').style.opacity = historyIndex <= 0 ? 0.5 : 1;
    document.getElementById('redoBtn').style.opacity = historyIndex >= historyStack.length - 1 ? 0.5 : 1;
}

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        redo();
    }
});

const categories = {
    vip: { color: "#ef4444", price: 10673.52, label: "VIP" },
    royal: { color: "#a855f7", price: 10006.42, label: "ROYAL" },
    diamond: { color: "#818cf8", price: 8672.23, label: "DIAMOND" },
    platinum: { color: "#3b82f6", price: 8205.27, label: "PLATINUM" },
    gold: { color: "#22d3ee", price: 7004.50, label: "GOLD" },
    silver: { color: "#94a3b8", price: 5000.00, label: "SILVER" },
    bronze: { color: "#e2e8f0", price: 3000.00, label: "BRONZE" }
};

function renderCategoryPresets() {
    const container = document.getElementById('categoryPresets');
    container.innerHTML = Object.entries(categories).map(([key, cat]) => `
        <div class="cat-btn" style="background:${cat.color}" onclick="setCategory('${key}')">
            ${cat.label}
        </div>
    `).join('');
}

function setCategory(key) {
    const cat = categories[key];
    if (!cat) return;

    document.getElementById('sectionName').value = cat.label;
    document.getElementById('sectionColor').value = cat.color;
    document.getElementById('sectionColorText').value = cat.color;
    document.getElementById('sectionPrice').value = cat.price;
    updatePreview();
}

// Sync colors
document.getElementById('sectionColor').addEventListener('input', function () {
    document.getElementById('sectionColorText').value = this.value;
    updatePreview();
});

function setColor(c) {
    document.getElementById('sectionColor').value = c;
    document.getElementById('sectionColorText').value = c;
    updatePreview();
}

// Background Image Handling
function triggerBgUpload() {
    document.getElementById('bgImageInput').click();
}

function handleBgUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            backgroundImage = e.target.result;
            renderCanvas();
        };
        reader.readAsDataURL(file);
    }
}

function clearBackground() {
    backgroundImage = null;
    document.getElementById('bgImageInput').value = '';
    renderCanvas();
}

// Live preview updates
function updatePreview() {
    const color = document.getElementById('sectionColor').value;
    const preview = document.getElementById('livePreview');
    preview.style.borderColor = color;
    preview.querySelectorAll('.preview-seat').forEach(s => s.style.background = color);
}

function updateCurvePreview() {
    const curve = document.getElementById('sectionCurve').value;
    document.getElementById('curveVal').textContent = curve;

    const preview = document.getElementById('livePreview');
    const intensity = curve / 100;

    // Apply curve to preview seats
    preview.querySelectorAll('.preview-row').forEach(row => {
        const seats = row.querySelectorAll('.preview-seat');
        seats.forEach((seat, i) => {
            const total = seats.length;
            const normalized = total > 1 ? (i - (total - 1) / 2) / ((total - 1) / 2) : 0;
            const yOffset = Math.pow(normalized, 2) * intensity * 15;
            const rotation = normalized * intensity * 10;
            seat.style.transform = `translateY(-${yOffset}px) rotate(${rotation}deg)`;
        });
    });

    // Update selected section in real-time
    if (editingSection) {
        const section = sections.find(s => s.id === editingSection);
        if (section) {
            section.curve = parseInt(curve);
            renderCanvas();
        }
    }
}

function updateSkewPreview() {
    const skew = document.getElementById('sectionSkew').value;
    document.getElementById('skewVal').textContent = skew;

    const preview = document.getElementById('livePreview');
    const rotation = document.getElementById('sectionRotation').value;
    preview.style.transform = `skewX(${skew}deg) rotate(${rotation}deg)`;

    // Update selected section in real-time
    if (editingSection) {
        const section = sections.find(s => s.id === editingSection);
        if (section) {
            section.skew = parseInt(skew);
            renderCanvas();
        }
    }
}

function updateRotationPreview() {
    const rotation = document.getElementById('sectionRotation').value;
    document.getElementById('rotateVal').textContent = rotation;

    const preview = document.getElementById('livePreview');
    const skew = document.getElementById('sectionSkew').value;
    preview.style.transform = `skewX(${skew}deg) rotate(${rotation}deg)`;

    // Update selected section in real-time
    if (editingSection) {
        const section = sections.find(s => s.id === editingSection);
        if (section) {
            section.rotation = parseInt(rotation);
            renderCanvas();
        }
    }
}

function updateSeatSizePreview() {
    const size = document.getElementById('sectionSeatSize').value;
    document.getElementById('seatSizeVal').textContent = size;

    const preview = document.getElementById('livePreview');
    preview.querySelectorAll('.preview-seat').forEach(s => {
        s.style.width = size + 'px';
        s.style.height = size + 'px';
    });

    if (editingSection) {
        const section = sections.find(s => s.id === editingSection);
        if (section) {
            section.seatSize = parseInt(size);
            renderCanvas();
        }
    }
}

function updateSeatGapPreview() {
    const gap = document.getElementById('sectionSeatGap').value;
    document.getElementById('seatGapVal').textContent = gap;

    const preview = document.getElementById('livePreview');
    preview.querySelectorAll('.preview-row').forEach(r => {
        r.style.gap = gap + 'px';
    });

    if (editingSection) {
        const section = sections.find(s => s.id === editingSection);
        if (section) {
            section.seatGap = parseInt(gap);
            renderCanvas();
        }
    }
}

function updateRowGapPreview() {
    const gap = document.getElementById('sectionRowGap').value;
    document.getElementById('rowGapVal').textContent = gap;

    const preview = document.getElementById('livePreview');
    preview.style.gap = gap + 'px';

    if (editingSection) {
        const section = sections.find(s => s.id === editingSection);
        if (section) {
            section.rowGap = parseInt(gap);
            renderCanvas();
        }
    }
}

// Save section (add or update)
function saveSection() {
    saveState(); // Record before change
    const name = document.getElementById('sectionName').value.trim() || `Section ${sections.length + 1}`;
    const color = document.getElementById('sectionColor').value;
    const price = parseFloat(document.getElementById('sectionPrice').value) || 0;
    const curve = parseInt(document.getElementById('sectionCurve').value);
    const skew = parseInt(document.getElementById('sectionSkew').value);
    const seatSize = parseInt(document.getElementById('sectionSeatSize').value);
    const seatGap = parseInt(document.getElementById('sectionSeatGap').value);
    const rowGap = parseInt(document.getElementById('sectionRowGap').value);
    const rotation = parseInt(document.getElementById('sectionRotation').value);
    const rowIndex = parseInt(document.getElementById('sectionRowIndex').value) || 0;
    const hasBorder = document.getElementById('sectionBorder').checked;

    if (editingSection) {
        // Update existing
        const section = sections.find(s => s.id === editingSection);
        if (section) {
            section.name = name;
            section.color = color;
            section.price = price;
            section.curve = curve;
            section.skew = skew;
            section.seatSize = seatSize;
            section.seatGap = seatGap;
            section.rowGap = rowGap;
            section.rotation = rotation;
            section.rowIndex = rowIndex;
            section.hasBorder = hasBorder;
        }
    } else {
        // Add new - center in view
        const container = document.getElementById('theaterLayout');
        const startX = (container.clientWidth / 2) - 100 + (Math.random() * 50);
        const startY = (container.clientHeight / 4) + (Math.random() * 50);

        sections.push({
            id: Date.now(),
            name,
            color,
            price,
            curve,
            skew,
            seatSize,
            seatGap,
            rowGap,
            rotation,
            rowIndex,
            hasBorder,
            x: startX,
            y: startY,
            rows: []
        });
    }

    resetForm();
    renderSections();
    renderCanvas();
}

function resetForm() {
    document.getElementById('sectionName').value = '';
    document.getElementById('sectionPrice').value = '';
    document.getElementById('sectionCurve').value = 0;
    document.getElementById('sectionSkew').value = 0;
    document.getElementById('sectionSeatSize').value = 18;
    document.getElementById('sectionSeatGap').value = 2;
    document.getElementById('sectionRowGap').value = 4;
    document.getElementById('sectionRowIndex').value = 0;
    document.getElementById('curveVal').textContent = '0';
    document.getElementById('skewVal').textContent = '0';
    document.getElementById('seatSizeVal').textContent = '18';
    document.getElementById('seatGapVal').textContent = '2';
    document.getElementById('rowGapVal').textContent = '4';
    document.getElementById('sectionRotation').value = 0;
    document.getElementById('rotateVal').textContent = '0';
    document.getElementById('sectionBorder').checked = true;
    document.getElementById('livePreview').style.transform = '';
    document.getElementById('livePreview').style.gap = '4px';
    document.getElementById('livePreview').querySelectorAll('.preview-seat').forEach(s => {
        s.style.transform = '';
        s.style.width = '12px';
        s.style.height = '12px';
    });
    document.getElementById('livePreview').querySelectorAll('.preview-row').forEach(r => r.style.gap = '3px');
    document.getElementById('sectionFormTitle').textContent = '➕ إضافة قسم جديد';
    document.getElementById('saveSectionBtn').textContent = '➕ إضافة';
    document.getElementById('cancelEditBtn').style.display = 'none';
    editingSection = null;
    updatePreview();
}

function cancelEdit() {
    resetForm();
}

// Edit section
function editSection(id) {
    const section = sections.find(s => s.id === id);
    if (!section) return;

    editingSection = id;
    document.getElementById('sectionName').value = section.name;
    document.getElementById('sectionColor').value = section.color;
    document.getElementById('sectionColorText').value = section.color;
    document.getElementById('sectionPrice').value = section.price || '';
    document.getElementById('sectionCurve').value = section.curve;
    document.getElementById('sectionSkew').value = section.skew;
    document.getElementById('sectionSeatSize').value = section.seatSize || 18;
    document.getElementById('sectionSeatGap').value = section.seatGap || 2;
    document.getElementById('sectionRowGap').value = section.rowGap !== undefined ? section.rowGap : 4;
    document.getElementById('sectionRotation').value = section.rotation || 0;
    document.getElementById('sectionRowIndex').value = section.rowIndex || 0;
    document.getElementById('curveVal').textContent = section.curve;
    document.getElementById('skewVal').textContent = section.skew;
    document.getElementById('seatSizeVal').textContent = section.seatSize || 18;
    document.getElementById('seatGapVal').textContent = section.seatGap || 2;
    document.getElementById('rowGapVal').textContent = section.rowGap !== undefined ? section.rowGap : 4;
    document.getElementById('rotateVal').textContent = section.rotation || 0;
    document.getElementById('sectionBorder').checked = section.hasBorder !== false;
    document.getElementById('sectionFormTitle').textContent = '✏️ تعديل القسم';
    document.getElementById('saveSectionBtn').textContent = '💾 حفظ';
    document.getElementById('cancelEditBtn').style.display = 'block';

    updatePreview();
    updateCurvePreview();
    updateSkewPreview();
    updateSeatSizePreview();
    updateSeatGapPreview();
    updateRowGapPreview();
    updateRotationPreview();
}

// Render sections list with Drag & Drop
function renderSections() {
    const list = document.getElementById('sectionList');
    document.getElementById('sectionCount').textContent = sections.length;

    if (sections.length === 0) {
        list.innerHTML = '<div class="empty-state" style="padding:15px"><p style="font-size:11px">لا توجد أقسام</p></div>';
        document.getElementById('rowsSection').style.display = 'none';
        return;
    }

    list.innerHTML = sections.map((s, index) => `
        <div class="section-item ${selectedSectionId === s.id ? 'selected' : ''}" 
             draggable="true" 
             data-index="${index}"
             onclick="selectSection(${s.id})">
            <div style="cursor:grab;padding-left:5px;opacity:0.5">⋮⋮</div>
            <div class="section-color-bar" style="background:${s.color}"></div>
            <div class="section-info">
                <div class="section-name">${s.name}</div>
                <div class="section-details">${s.rows.length} صف • ${s.price ? '$' + s.price : 'مجاني'}</div>
            </div>
            <button class="icon-btn" onclick="event.stopPropagation();duplicateSection(${s.id})" title="نسخ">❐</button>
            <button class="icon-btn" onclick="event.stopPropagation();editSection(${s.id})">✏️</button>
            <button class="icon-btn delete" onclick="event.stopPropagation();deleteSection(${s.id})">✕</button>
        </div>
    `).join('');

    // Add Event Listeners for Drag & Drop
    const items = list.querySelectorAll('.section-item');
    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });
}

// Drag & Drop Handlers
function handleDragStart(e) {
    draggedItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (draggedItem !== this) {
        const srcIndex = parseInt(draggedItem.getAttribute('data-index'));
        const destIndex = parseInt(this.getAttribute('data-index'));

        // Swap/Move items in array
        const item = sections.splice(srcIndex, 1)[0];
        sections.splice(destIndex, 0, item);

        // Re-render
        saveState();
        renderSections();
        renderCanvas();
        saveToStorage();
    }
    return false;
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedItem = null;
}

// Select section for adding rows
function selectSection(id) {
    selectedSectionId = id;
    renderSections();
    renderCanvas();
    editSection(id);
    zoomToSection(id);

    const section = sections.find(s => s.id === id);
    if (section) {
        document.getElementById('rowsSection').style.display = 'block';
        document.getElementById('selectedSectionName').textContent = section.name;
        renderRowsList();
    }
}

function zoomToSection(id) {
    const section = sections.find(s => s.id === id);
    if (!section) return;

    const container = document.getElementById('theaterLayout');
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const targetZoom = 1.5;

    // Math for transform-origin: top center
    // px = -(sx - cw/2) * Z
    // py = ch/2 - sy * Z
    // We adding a slight offset to Y to account for sidebar/header visually if needed, but centering is fine.

    // Adjust to center on the section's center (approximate width 100-200px?)
    // Let's assume section center is section.x, section.y for now as we don't have exact center easily.
    // Or better, use getBoundingClientRect relative to container? but container is transformed.
    // Using raw x/y is safest "anchor" point.

    const newPanX = -1 * (section.x - cw / 2) * targetZoom;
    const newPanY = (ch / 2) - (section.y * targetZoom);

    // Animate values? For now instant snap.
    zoomLevel = targetZoom;
    canvasPan = { x: newPanX, y: newPanY };
    renderCanvas();
}

// Delete section
function deleteSection(id) {
    if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
        sections = sections.filter(s => s.id !== id);
        if (selectedSectionId === id) selectedSectionId = null;
        if (editingSection === id) resetForm();
        saveState();
        renderSections();
        renderCanvas();
    }
}

// Duplicate section
function duplicateSection(id) {
    const section = sections.find(s => s.id === id);
    if (!section) return;

    // Deep copy of the section
    const newSection = JSON.parse(JSON.stringify(section));
    newSection.id = Date.now();
    newSection.name = section.name + ' (نسخة)';
    newSection.x = (section.x || 0) + 20;
    newSection.y = (section.y || 0) + 20;

    // Regenerate IDs for rows to avoid conflicts
    newSection.rows.forEach(row => {
        row.id = Date.now() + Math.random();
    });

    sections.push(newSection);
    saveState();
    renderSections();
    renderCanvas();
    selectSection(newSection.id);
}

// Add row to selected section
function addRow() {
    const section = sections.find(s => s.id === selectedSectionId);
    if (!section) return;

    const name = document.getElementById('rowName').value.trim() || getNextRowName(section);
    const seats = parseInt(document.getElementById('rowSeats').value) || 10;
    const aisles = parseInt(document.getElementById('rowAisles').value) || 0;

    section.rows.push({
        id: Date.now(),
        name,
        aisles,
        seats: Array.from({ length: seats }, (_, i) => ({
            number: i + 1,
            status: 'available'
        }))
    });

    document.getElementById('rowName').value = '';
    saveState();
    renderRowsList();
    renderSections();
    renderCanvas();
}

function getNextRowName(section) {
    if (section.rows.length === 0) return 'A';
    const last = section.rows[section.rows.length - 1].name;
    if (last.length === 1 && last.charCodeAt(0) >= 65 && last.charCodeAt(0) < 90) {
        return String.fromCharCode(last.charCodeAt(0) + 1);
    }
    return `R${section.rows.length + 1}`;
}

function renderRowsList() {
    const section = sections.find(s => s.id === selectedSectionId);
    const container = document.getElementById('rowsList');
    if (!section || section.rows.length === 0) {
        container.innerHTML = '<p style="font-size:10px;color:rgba(255,255,255,0.4);text-align:center">لا توجد صفوف</p>';
        return;
    }

    container.innerHTML = section.rows.map((r, i) => `
        <div style="display:flex;align-items:center;gap:6px;padding:6px;background:rgba(255,255,255,0.05);border-radius:5px;margin-bottom:4px;font-size:11px">
            <span style="flex:1">صف ${r.name} (${r.seats.length} مقعد${r.aisles > 0 ? ' • ' + r.aisles + ' ممر' : ''})</span>
            <button class="icon-btn" onclick="deleteRow(${i})">✕</button>
        </div>
    `).join('');
}

function deleteRow(idx) {
    const section = sections.find(s => s.id === selectedSectionId);
    if (section) {
        section.rows.splice(idx, 1);
        saveState();
        renderRowsList();
        renderSections();
        renderCanvas();
    }
}

// Render canvas with sections in rows
function renderCanvas() {
    const container = document.getElementById('theaterLayout');
    const statsBar = document.getElementById('statsBar');

    if (sections.length === 0 && !backgroundImage) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎭</div><p>ابدأ بإضافة أقسام</p></div>';
        statsBar.style.display = 'none';
        return;
    }

    statsBar.style.display = 'flex';
    updateStats();

    // Build background image HTML
    let bgHTML = '';
    if (backgroundImage) {
        bgHTML = `<img src="${backgroundImage}" style="position:absolute; top:20px; left:50%; transform:translateX(-50%); z-index:0; max-width:none; opacity:0.5; pointer-events:none;">`;
    }

    container.innerHTML = `
        <div id="zoomContainer" style="transform: translate(${canvasPan.x}px, ${canvasPan.y}px) scale(${zoomLevel}); transform-origin: top center; width: 100%; height: 100%; position:relative; cursor: ${isPanning ? 'grabbing' : 'grab'}">
            ${bgHTML}
            ${sections.map(section => renderSection(section)).join('')}
        </div>
    `;

    // Make sections draggable
    sections.forEach(s => {
        const el = document.getElementById(`section-${s.id}`);
        if (el) makeDraggable(el, s.id);
    });
}

// Mouse Wheel Zoom
document.getElementById('theaterLayout').addEventListener('wheel', function (e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    changeZoom(delta);
}, { passive: false });

// Canvas Panning
const layoutEl = document.getElementById('theaterLayout');

layoutEl.addEventListener('mousedown', function (e) {
    // Only pan if clicking directly on the container or background
    if (e.target === layoutEl || e.target.id === 'zoomContainer' || e.target.tagName === 'IMG') {
        isPanning = true;
        panStart = { x: e.clientX - canvasPan.x, y: e.clientY - canvasPan.y };
        layoutEl.style.cursor = 'grabbing';
        if (document.getElementById('zoomContainer'))
            document.getElementById('zoomContainer').style.cursor = 'grabbing';
    }
});

window.addEventListener('mousemove', function (e) {
    if (!isPanning) return;
    e.preventDefault();
    canvasPan.x = e.clientX - panStart.x;
    canvasPan.y = e.clientY - panStart.y;

    const zoomContainer = document.getElementById('zoomContainer');
    if (zoomContainer) {
        // Manually update transform to avoid full re-render on every frame
        zoomContainer.style.transform = `translate(${canvasPan.x}px, ${canvasPan.y}px) scale(${zoomLevel})`;
    }
});

window.addEventListener('mouseup', function () {
    if (isPanning) {
        isPanning = false;
        layoutEl.style.cursor = 'grab';
        if (document.getElementById('zoomContainer'))
            document.getElementById('zoomContainer').style.cursor = 'grab';
        saveToStorage();
    }
});

function changeZoom(delta) {
    zoomLevel = Math.max(0.3, Math.min(3, zoomLevel + delta));
    renderCanvas();
}

function updateViewMode() {
    const container = document.getElementById('theaterLayout');
    // Threshold for switching modes
    if (zoomLevel > 1.1) {
        container.classList.add('view-mode-detail');
        container.classList.remove('view-mode-overview');
    } else {
        container.classList.add('view-mode-overview');
        container.classList.remove('view-mode-detail');
    }
}



function resetZoom() {
    zoomLevel = 1;
    renderCanvas();
}

function makeDraggable(el, id) {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    el.addEventListener('mousedown', dragStart);

    function dragStart(e) {
        e.stopPropagation(); // Prevent canvas panning
        // Ignore if clicking a button or input inside
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.classList.contains('seat')) return;

        isDragging = true;
        const section = sections.find(s => s.id === id);
        initialLeft = section.x || 0;
        initialTop = section.y || 0;
        startX = e.clientX;
        startY = e.clientY;

        el.style.zIndex = 100;

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const dx = (e.clientX - startX) / zoomLevel;
        const dy = (e.clientY - startY) / zoomLevel;

        const newX = initialLeft + dx;
        const newY = initialTop + dy;

        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;

        // Update data
        const section = sections.find(s => s.id === id);
        if (section) {
            section.x = newX;
            section.y = newY;
        }
    }

    function dragEnd() {
        isDragging = false;
        el.style.zIndex = 10;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
        saveState(); // Save state after move
        saveToStorage();
    }
}

function renderSection(section) {
    // Calculate section dimensions based on rows
    const seatSize = section.seatSize || 18;
    const seatGap = section.seatGap || 2;
    const rowGap = section.rowGap !== undefined ? section.rowGap : 4;
    const padding = 15;
    const expand = 20; // Expand border to reduce gaps
    const labelPadding = 25;

    // Calculate width for each row
    const rowWidths = section.rows.map(row => {
        const aisles = row.aisles || 0;
        return row.seats.length * seatSize + (row.seats.length - 1) * seatGap + (aisles * 12);
    });

    const maxWidth = Math.max(...rowWidths, 60);
    const totalHeight = section.rows.length * (seatSize + rowGap) + labelPadding;

    // Build SVG path for curved border following seat shapes
    const svgWidth = maxWidth + (padding + expand) * 2 + 50;
    const svgHeight = totalHeight + (padding + expand) * 2;

    // Calculate curve parameters
    const curveIntensity = (section.curve || 0) / 100;
    const skewAngle = section.skew || 0;
    const rotationAngle = section.rotation || 0;

    // Generate path points for each row
    let pathPoints = [];
    const centerX = svgWidth / 2;

    // Top edge points (first row)
    if (section.rows.length > 0) {
        const firstRowWidth = rowWidths[0] || 60;
        const leftX = centerX - firstRowWidth / 2 - 10 - expand;
        const rightX = centerX + firstRowWidth / 2 + 10 + expand;
        const topY = padding - expand;

        // Apply curve to top
        const topCurveOffset = curveIntensity * 15;
        pathPoints.push({ x: leftX, y: topY - topCurveOffset, type: 'start' });
        pathPoints.push({ x: centerX, y: topY, type: 'top-center' });
        pathPoints.push({ x: rightX, y: topY - topCurveOffset, type: 'top-right' });
    }

    // Right edge points (going down)
    section.rows.forEach((row, i) => {
        const rowWidth = rowWidths[i] || 60;
        const y = padding + labelPadding + i * (seatSize + rowGap);
        const rightX = centerX + rowWidth / 2 + 10 + expand;
        const curveOffset = curveIntensity * 15;
        pathPoints.push({ x: rightX, y: y - curveOffset, type: 'right' });
    });

    // Bottom edge
    if (section.rows.length > 0) {
        const lastRowWidth = rowWidths[rowWidths.length - 1] || 60;
        const bottomY = padding + totalHeight + expand;
        const leftX = centerX - lastRowWidth / 2 - 10 - expand;
        const rightX = centerX + lastRowWidth / 2 + 10 + expand;
        const curveOffset = curveIntensity * 15;

        pathPoints.push({ x: rightX, y: bottomY - curveOffset, type: 'bottom-right' });
        pathPoints.push({ x: centerX, y: bottomY, type: 'bottom-center' });
        pathPoints.push({ x: leftX, y: bottomY - curveOffset, type: 'bottom-left' });
    }

    // Left edge points (going up)
    for (let i = section.rows.length - 1; i >= 0; i--) {
        const rowWidth = rowWidths[i] || 60;
        const y = padding + labelPadding + i * (seatSize + rowGap);
        const leftX = centerX - rowWidth / 2 - 10 - expand;
        const curveOffset = curveIntensity * 15;
        pathPoints.push({ x: leftX, y: y - curveOffset, type: 'left' });
    }

    // Create SVG path with smooth curves
    let pathD = '';
    if (pathPoints.length > 0) {
        pathD = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
        for (let i = 1; i < pathPoints.length; i++) {
            const prev = pathPoints[i - 1];
            const curr = pathPoints[i];
            // Use quadratic curves for smoother transitions
            const cpX = (prev.x + curr.x) / 2;
            const cpY = (prev.y + curr.y) / 2;
            pathD += ` Q ${prev.x} ${prev.y} ${cpX} ${cpY}`;
        }
        pathD += ' Z';
    }

    const transforms = [];
    if (skewAngle !== 0) transforms.push(`skewX(${skewAngle}deg)`);
    if (rotationAngle !== 0) transforms.push(`rotate(${rotationAngle}deg)`);

    const transformStyle = transforms.length > 0 ? `transform: ${transforms.join(' ')};` : '';

    // Border/Overlay rendering logic
    const showBorder = section.hasBorder !== false;
    const strokeVal = showBorder ? section.color : 'none';
    // Scale font size based on zoom? CSS will handle opacity.

    const borderSVG = `
        <svg width="${svgWidth}" height="${svgHeight}" style="position:absolute;top:-15px;left:50%;transform:translateX(-50%);overflow:visible">
            <path class="section-border-path" d="${pathD}" fill="${section.color}" fill-opacity="0.2" stroke="${strokeVal}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="${svgWidth / 2}" y="${svgHeight / 2}" class="section-overlay-text" font-size="${Math.max(20, svgWidth / 10)}">${section.name}</text>
        </svg>
    `;

    const isSelected = selectedSectionId === section.id;
    const showHandles = isSelected && zoomLevel > 0.8;

    // Transform handles HTML
    const transformHandles = showHandles ? `
        <!-- Rotation Handle -->
        <div class="transform-handle rotation-handle" 
             data-section-id="${section.id}"
             onmousedown="handleRotateStart(event, ${section.id})"
             style="position:absolute;top:-30px;right:-30px;width:24px;height:24px;background:#3b82f6;border:2px solid white;border-radius:50%;cursor:grab;display:flex;align-items:center;justify-content:center;font-size:12px;color:white;box-shadow:0 2px 8px rgba(0,0,0,0.3);z-index:1000;"
             title="Drag to rotate (Hold Shift for 15° snap)">
            ↻
        </div>
        
        <!-- Left Skew Handle -->
        <div class="transform-handle skew-handle"
             data-section-id="${section.id}"
             onmousedown="handleSkewStart(event, ${section.id})"
             style="position:absolute;left:-12px;top:50%;transform:translateY(-50%);width:8px;height:40px;background:#8b5cf6;border:1px solid white;border-radius:4px;cursor:ew-resize;box-shadow:0 2px 8px rgba(0,0,0,0.3);z-index:1000;"
             title="Drag to skew (Hold Shift for 5° snap)">
        </div>
        
        <!-- Right Skew Handle -->
        <div class="transform-handle skew-handle"
             data-section-id="${section.id}"
             onmousedown="handleSkewStart(event, ${section.id})"
             style="position:absolute;right:-12px;top:50%;transform:translateY(-50%);width:8px;height:40px;background:#8b5cf6;border:1px solid white;border-radius:4px;cursor:ew-resize;box-shadow:0 2px 8px rgba(0,0,0,0.3);z-index:1000;"
             title="Drag to skew (Hold Shift for 5° snap)">
        </div>
    ` : '';

    return `
        <div id="section-${section.id}" 
             class="theater-section ${isSelected ? 'selected' : ''}"
             style="left:${section.x || 0}px; top:${section.y || 0}px; ${transformStyle}"
             onclick="selectSection(${section.id})">
            ${borderSVG}
            ${transformHandles}
        
            <div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:${rowGap}px;padding-top:10px">
                ${section.rows.map(row => renderRow(section, row)).join('')}
            </div>
        </div>
    `;
}

function renderRow(section, row) {
    const seatsArr = row.seats;
    const aisles = row.aisles || 0;
    const seatGap = section.seatGap || 2;

    let seatsHTML = '';
    if (aisles > 0) {
        // Distribute seats with aisles
        const seatGroups = [];
        const groupSize = Math.ceil(seatsArr.length / (aisles + 1));
        for (let i = 0; i < seatsArr.length; i += groupSize) {
            seatGroups.push(seatsArr.slice(i, i + groupSize));
        }

        seatsHTML = seatGroups.map((group, gi) => {
            const groupSeats = group.map((s, si) => {
                const globalIdx = gi * groupSize + si;
                return renderSeat(section, row, s, globalIdx, seatsArr.length);
            }).join('');
            return groupSeats + (gi < seatGroups.length - 1 ? '<div class="aisle"></div>' : '');
        }).join('');
    } else {
        seatsHTML = seatsArr.map((s, i) => renderSeat(section, row, s, i, seatsArr.length)).join('');
    }

    return `
        <div class="seat-row">
            <div class="row-label">${row.name}</div>
            <div class="seats-wrapper" style="gap:${seatGap}px">${seatsHTML}</div>
            <div class="row-label">${row.name}</div>
        </div>
    `;
}

function renderSeat(section, row, seat, index, total) {
    const statusClass = seat.status !== 'available' ? seat.status : '';
    const seatSize = section.seatSize || 18;
    const fontSize = Math.max(7, Math.floor(seatSize * 0.4));

    // Curve transform
    let transform = '';
    if (section.curve > 0) {
        const intensity = section.curve / 100;
        const normalized = total > 1 ? (index - (total - 1) / 2) / ((total - 1) / 2) : 0;
        const yOffset = Math.pow(normalized, 2) * intensity * 15;
        const rotation = normalized * intensity * 8;
        transform = `transform: translateY(-${yOffset}px) rotate(${rotation}deg);`;
    }

    let background = seat.status === 'skipped' ? '' : section.color;
    let border = 'none';
    let color = 'white';
    let content = seat.status === 'available' ? seat.number : '';

    if (seat.status === 'selected') {
        background = '#ffffff';
        border = `2px solid ${section.color}`;
        color = section.color;
        content = '✓';
    }

    return `
        <div class="seat ${statusClass}"
             data-original-color="${section.color}"
             data-price="${section.price || 0}"
             style="width:${seatSize}px; height:${seatSize}px; font-size:${fontSize}px; background:${background}; border:${border}; color:${color}; ${transform}"
             onclick="handleSeatClick(event, ${section.id}, ${row.id}, ${seat.number})"
             title="صف ${row.name} - مقعد ${seat.number} (${section.price || 0})">
            ${content}
        </div>
    `;
}

function handleSeatClick(e, sectionId, rowId, seatNum) {
    if (currentTool === 'skip' || currentTool === 'pin') {
        e.stopPropagation(); // Stop selection of section
        const section = sections.find(s => s.id === sectionId);
        if (!section) return;
        const row = section.rows.find(r => r.id === rowId);
        if (!row) return;
        const seat = row.seats.find(s => s.number === seatNum);
        if (!seat) return;

        if (currentTool === 'skip') {
            seat.status = seat.status === 'skipped' ? 'available' : 'skipped';
        } else if (currentTool === 'pin') {
            seat.status = seat.status === 'pinned' ? 'available' : 'pinned';
        }
        saveState(); // Save seat status change
        renderCanvas();
    }
    // If tool is 'select', we allow the event to bubble up to the section, 
    // which triggers selectSection(id). We do NOT toggle seat status in builder.
}

function setTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tool + 'Tool').classList.add('active');
}

function updateStats() {
    let seats = 0, rows = 0;
    sections.forEach(s => {
        rows += s.rows.length;
        s.rows.forEach(r => seats += r.seats.filter(seat => seat.status !== 'skipped').length);
    });
    document.getElementById('totalSeats').textContent = seats;
    document.getElementById('totalSections').textContent = sections.length;
    document.getElementById('totalRows').textContent = rows;
}

// LocalStorage persistence
function saveToStorage() {
    const data = {
        theaterName: document.getElementById('theaterName').value,
        sections: sections,
        canvasPan: canvasPan,
        zoomLevel: zoomLevel
    };
    localStorage.setItem('theaterBuilderData', JSON.stringify(data));
}

function loadFromStorage() {
    try {
        const saved = localStorage.getItem('theaterBuilderData');
        if (saved) {
            const data = JSON.parse(saved);
            sections = data.sections || [];
            document.getElementById('theaterName').value = data.theaterName || '';
            if (data.canvasPan) canvasPan = data.canvasPan;
            if (data.zoomLevel) zoomLevel = data.zoomLevel;
            renderSections();
            renderCanvas();
        }
    } catch (e) {
        console.error('Error loading saved data:', e);
    }
}

// Auto-save after any change
const originalRenderCanvas = renderCanvas;
renderCanvas = function () {
    originalRenderCanvas();
    updateViewMode(); // Ensure mode is correct after render
    saveToStorage();
};

function clearAll() {
    if (confirm('مسح كل البيانات؟')) {
        sections = [];
        selectedSectionId = null;
        editingSection = null;
        localStorage.removeItem('theaterBuilderData');
        resetForm();
        saveState();
        renderSections();
        renderCanvas();
    }
}

function exportData() {
    const data = { name: document.getElementById('theaterName').value, sections };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'theater-layout.json';
    a.click();
}

function exportTsx() {
    // Pre-calculate geometry for each section to simplify the React component
    const processingSections = sections.map(s => {
        const section = JSON.parse(JSON.stringify(s));
        const seatSize = section.seatSize || 18;
        const seatGap = section.seatGap || 2;
        const rowGap = section.rowGap !== undefined ? section.rowGap : 4;
        const padding = 15;
        const expand = 20; // Match renderSection logical expansion
        const labelPadding = 25;

        const rowWidths = section.rows.map(row => {
            const aisles = row.aisles || 0;
            return row.seats.length * seatSize + (row.seats.length - 1) * seatGap + (aisles * 12);
        });

        const maxWidth = Math.max(...rowWidths, 60);
        const totalHeight = section.rows.length * (seatSize + rowGap) + labelPadding;
        const svgWidth = maxWidth + (padding + expand) * 2 + 50;
        const svgHeight = totalHeight + (padding + expand) * 2;

        // Geometry math (same as renderSection)
        const curveIntensity = (section.curve || 0) / 100;
        let pathPoints = [];
        const centerX = svgWidth / 2;

        if (section.rows.length > 0) {
            const firstRowWidth = rowWidths[0] || 60;
            const leftX = centerX - firstRowWidth / 2 - 10 - expand;
            const rightX = centerX + firstRowWidth / 2 + 10 + expand;
            const topY = padding - expand;
            const topCurveOffset = curveIntensity * 15;
            pathPoints.push({ x: leftX, y: topY - topCurveOffset });
            pathPoints.push({ x: centerX, y: topY });
            pathPoints.push({ x: rightX, y: topY - topCurveOffset });
        }

        section.rows.forEach((row, i) => {
            const rowWidth = rowWidths[i] || 60;
            const y = padding + labelPadding + i * (seatSize + rowGap);
            const rightX = centerX + rowWidth / 2 + 10 + expand;
            const curveOffset = curveIntensity * 15;
            pathPoints.push({ x: rightX, y: y - curveOffset });
        });

        if (section.rows.length > 0) {
            const lastRowWidth = rowWidths[rowWidths.length - 1] || 60;
            const bottomY = padding + totalHeight + expand;
            const leftX = centerX - lastRowWidth / 2 - 10 - expand;
            const rightX = centerX + lastRowWidth / 2 + 10 + expand;
            const curveOffset = curveIntensity * 15;
            pathPoints.push({ x: rightX, y: bottomY - curveOffset });
            pathPoints.push({ x: centerX, y: bottomY });
            pathPoints.push({ x: leftX, y: bottomY - curveOffset });
        }

        for (let i = section.rows.length - 1; i >= 0; i--) {
            const rowWidth = rowWidths[i] || 60;
            const y = padding + labelPadding + i * (seatSize + rowGap);
            const leftX = centerX - rowWidth / 2 - 10 - expand;
            const curveOffset = curveIntensity * 15;
            pathPoints.push({ x: leftX, y: y - curveOffset });
        }

        let pathD = '';
        if (pathPoints.length > 0) {
            pathD = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
            for (let i = 1; i < pathPoints.length; i++) {
                const prev = pathPoints[i - 1];
                const curr = pathPoints[i];
                const cpX = (prev.x + curr.x) / 2;
                const cpY = (prev.y + curr.y) / 2;
                pathD += ` Q ${prev.x} ${prev.y} ${cpX} ${cpY}`;
            }
            pathD += ' Z';
        }

        section.pathD = pathD;
        section.svgDim = { width: svgWidth, height: svgHeight };
        return section;
    });

    // TSX Template
    const tsxContent = `
import React, { useState } from 'react';

// Types
export interface Seat {
  number: number;
  status: 'available' | 'booked' | 'selected' | 'skipped' | 'pinned';
}

export interface Section {
  id: number;
  name: string;
  color: string;
  price: number;
  rows: Row[];
  x: number;
  y: number;
  rotation: number;
  skew: number;
  curve: number;
  seatSize: number;
  seatGap: number;
  rowGap: number;
  hasBorder: boolean;
  pathD?: string;
  svgDim?: { width: number, height: number };
}

export interface Row {
  id: number;
  name: string;
  seats: Seat[];
  aisles: number;
}

interface TheaterProps {
  onSeatClick?: (section: Section, row: Row, seat: Seat) => void;
  selectedSeats?: string[]; // Array of unique IDs e.g. "sec-row-seat"
  pricing?: Record<string, number>; // Dynamic pricing map keyed by section ID
}

const THEATER_DATA: Section[] = ${JSON.stringify(processingSections, null, 2)};

export const TheaterSeating: React.FC<TheaterProps> = ({ 
  onSeatClick, 
  selectedSeats = [],
  pricing = {} 
}) => {
  const [zoom, setZoom] = useState(0.8);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const isZoomedIn = zoom > 1.1;
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(z => Math.max(0.3, Math.min(3, z + delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'SVG' || (e.target as HTMLElement).id === 'zoom-container') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSectionClick = (e: React.MouseEvent, section: Section) => {
      e.stopPropagation(); // Prevent canvas drag/pan triggers
      if (!containerRef.current) return;
      
      const cw = containerRef.current.clientWidth;
      const ch = containerRef.current.clientHeight;
      const targetZoom = 1.5;

      // Center logic for transform-origin: top center
      const newPanX = -1 * (section.x - cw / 2) * targetZoom;
      const newPanY = (ch / 2) - (section.y * targetZoom);

      setZoom(targetZoom);
      setPan({ x: newPanX, y: newPanY });
  };

  return (
    <div 
        ref={containerRef}
        className="relative w-full h-[800px] overflow-hidden bg-gray-900 rounded-xl"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-50 flex gap-2 bg-white/10 p-2 rounded-lg backdrop-blur">
        <button onClick={() => setZoom(z => Math.min(z + 0.1, 3))} className="p-2 text-white hover:bg-white/20 rounded">+</button>
        <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.3))} className="p-2 text-white hover:bg-white/20 rounded">-</button>
      </div>

      {/* Canvas */}
      <div 
           id="zoom-container"
           className="origin-top-center transition-transform duration-75 ease-out"
           style={{ transform: \`translate(\${pan.x}px, \${pan.y}px) scale(\${zoom})\`, minHeight: '100%', width: '100%' }}>
            
        {THEATER_DATA.map(section => {
          const currentPrice = pricing[section.id] ?? section.price;
          
          return (
            <div 
              key={section.id}
              onClick={(e) => handleSectionClick(e, section)}
              className="absolute flex flex-col items-center select-none transition-all duration-200 hover:brightness-110 cursor-pointer"
              style={{
                left: section.x,
                top: section.y,
                transform: \`skewX(\${section.skew}deg) rotate(\${section.rotation}deg)\`,
                gap: section.rowGap
              }}
            >
              {/* Section Shape (Border + Fill) */}
              <svg 
                  width={section.svgDim?.width} 
                  height={section.svgDim?.height} 
                  className="absolute overflow-visible"
                  style={{ top: -15, left: '50%', transform: 'translateX(-50%)' }}
                >
                  <path 
                    d={section.pathD} 
                    fill={section.color}
                    // If zoomed in: transparent fill. If zoomed out: solid opacity (1)
                    fillOpacity={isZoomedIn ? 0 : 1}
                    stroke={section.hasBorder ? section.color : 'none'} 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="transition-all duration-300"
                  />
                  {/* Centered Label for Overview */}
                  <text 
                    x={section.svgDim?.width ? section.svgDim.width / 2 : 50} 
                    y={section.svgDim?.height ? section.svgDim.height / 2 : 50} 
                    fill="white"
                    fontSize={Math.max(20, (section.svgDim?.width || 0)/10)}
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={\`transition-opacity duration-300 pointer-events-none drop-shadow-md \${!isZoomedIn ? 'opacity-100' : 'opacity-0'}\`}
                  >
                    {section.name}
                  </text>
                </svg>

              {/* Rows - Hide when zoomed out */}
              <div 
                className={\`relative z-10 flex flex-col items-center pt-2.5 transition-opacity duration-300 \${isZoomedIn ? 'opacity-100' : 'opacity-0'}\`} 
                style={{ gap: section.rowGap }}
              >
                {section.rows.map(row => (
                  <div key={row.id} className="flex items-center" style={{ gap: 3 }}>
                    <span className="w-5 text-center text-[10px] font-bold text-white/50">{row.name}</span>
                    
                    <div className="flex justify-center" style={{ gap: section.seatGap }}>
                      {renderRowSeats(section, row, currentPrice, onSeatClick, selectedSeats, section.seatGap)}
                    </div>

                    <span className="w-5 text-center text-[10px] font-bold text-white/50">{row.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper to render seats with aisles
function renderRowSeats(
    section: Section, 
    row: Row, 
    price: number,
    onClick: any,
    selectedIds: string[],
    gap: number
) {
  const seats = row.seats;
  const aisles = row.aisles || 0;
  
  if (aisles > 0) {
    // Group seats by aisle
    const groups: React.ReactNode[] = [];
    const groupSize = Math.ceil(seats.length / (aisles + 1));
    
    for (let i = 0; i < seats.length; i += groupSize) {
      const chunk = seats.slice(i, i + groupSize);
      groups.push(
        <div key={i} className="flex" style={{ gap }}>
          {chunk.map((seat, idx) => renderSeat(section, row, seat, i + idx, seats.length, price, onClick, selectedIds))}
        </div>
      );
      if (i + groupSize < seats.length) {
         groups.push(<div key={\`aisle-\${i}\`} style={{ width: 12 }} />);
      }
    }
    return groups;
  }
  
  return seats.map((seat, i) => renderSeat(section, row, seat, i, seats.length, price, onClick, selectedIds));
}

function renderSeat(
    section: Section, 
    row: Row, 
    seat: Seat, 
    index: number, 
    total: number,
    price: number,
    onClick: any,
    selectedIds: string[]
) {
    if (seat.status === 'skipped') {
       return (
         <div 
           key={seat.number} 
           className="rounded-sm bg-gray-700 opacity-40"
           style={{ width: section.seatSize, height: section.seatSize }} 
         />
       );
    }

    const uniqueId = \`\${section.id}-\${row.id}-\${seat.number}\`;
    const isSelected = selectedIds.includes(uniqueId) || seat.status === 'selected';
    const isBooked = seat.status === 'booked';
    
    // Curve transform
    let transform = '';
    if (section.curve > 0) {
        const intensity = section.curve / 100;
        const normalized = total > 1 ? (index - (total - 1) / 2) / ((total - 1) / 2) : 0;
        const yOffset = Math.pow(normalized, 2) * intensity * 15;
        const rotation = normalized * intensity * 8;
        transform = \`translateY(-\${yOffset}px) rotate(\${rotation}deg)\`;
    }

    return (
        <div
            key={seat.number}
            onClick={() => !isBooked && onClick && onClick(section, row, seat)}
            title={\`Row \${row.name} Seat \${seat.number} - \${price}\`}
            className={\`
                flex items-center justify-center rounded-sm text-center
                cursor-pointer transition-transform hover:scale-125 hover:z-50
                \${isBooked ? 'bg-gray-700 opacity-50 cursor-not-allowed' : ''}
            \`}
            style={{
                width: section.seatSize,
                height: section.seatSize,
                fontSize: Math.max(7, Math.floor(section.seatSize * 0.4)),
                transform,
                backgroundColor: isSelected ? 'white' : (isBooked ? undefined : section.color),
                border: isSelected ? \`2px solid \${section.color}\` : 'none',
                color: isSelected ? section.color : 'white',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
        >
            {isSelected ? '✓' : seat.number}
        </div>
    );
}

export default TheaterSeating;
`;

    const blob = new Blob([tsxContent], { type: 'text/typescript' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'TheaterSeating.tsx';
    a.click();
}

function previewTheater() {
    const styles = Array.from(document.querySelectorAll('style')).map(s => s.outerHTML).join('');
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.outerHTML).join('');

    const preview = window.open('', '_blank');
    preview.document.write(`
        <html>
        <head>
            <title>معاينة المسرح - ${document.getElementById('theaterName').value || 'المسرح'}</title>
            ${links}
            ${styles}
            <style>
                body {
                    background: #1a1a2e;
                    overflow: auto;
                    padding: 20px;
                }
                .preview-container {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }
                /* Hide edit controls in preview if any accidentally leaked */
                .icon-btn, .delete { display: none !important; }
                /* Add hover effect for seats in preview */
                .seat:not(.skipped):hover { transform: scale(1.2); z-index:100; cursor:pointer; }
                
                /* Sticky Footer */
                .booking-footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: white;
                    color: #1f2937;
                    padding: 16px 24px;
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transform: translateY(100%);
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1000;
                    font-family: 'Cairo', sans-serif;
                    border-top: 1px solid #e5e7eb;
                }
                
                .booking-footer.visible {
                    transform: translateY(0);
                }

                .footer-info {
                    text-align: right;
                }

                .total-price {
                    font-size: 20px;
                    font-weight: 700;
                    color: #111827;
                }

                .ticket-count {
                    font-size: 14px;
                    color: #6b7280;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    justify-content: flex-end;
                }

                .next-btn {
                    background: #1a1a2e;
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transition: background 0.2s;
                }

                .next-btn:hover {
                    background: #2d2d44;
                }

                .timer-badge {
                    background: rgba(255,255,255,0.15);
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-family: monospace;
                }
            </style>
        </head>
        <body>
            <div style="text-align:center; margin-bottom: 20px;">
                <h1 style="color:white; margin:0;">${document.getElementById('theaterName').value || 'المسرح'}</h1>
            </div>
            
            <div class="theater-layout" style="border:none; box-shadow:none; height: auto; min-height: 800px; overflow:visible; padding-bottom: 100px;">
                ${document.getElementById('theaterLayout').innerHTML}
            </div>

            <div class="booking-footer" id="bookingFooter">
                <button class="next-btn">
                    التالي
                    <span class="timer-badge">14:59</span>
                </button>
                <div class="footer-info">
                    <div class="ticket-count">
                        <span>التفاصيل</span>
                        <span style="background:#f3f4f6; padding:2px 8px; border-radius:10px; font-weight:600" id="countDisplay">x0</span>
                        <span>🎫</span>
                    </div>
                    <div class="total-price">
                        EGP <span id="priceDisplay">0.00</span> :الإجمالي
                    </div>
                </div>
            </div>

            <script>
                let totalTickets = 0;
                let totalPrice = 0;

                // Interactivity for Preview Mode (Selection mimic)
                function handleSeatClick(e, secId, rowId, seatNum) {
                    e.stopPropagation();
                    const seat = e.target;
                    
                    // Ignore skipped
                    if (seat.classList.contains('skipped')) return;

                    const price = parseFloat(seat.dataset.price) || 0;

                    // We use inline styles in the builder, so we need to manipulate them
                    if (seat.dataset.selected === 'true') {
                        // Deselect
                        seat.dataset.selected = 'false';
                        seat.style.background = seat.dataset.originalColor;
                        seat.style.border = 'none';
                        seat.style.color = 'white';
                        seat.innerText = seatNum;
                        
                        totalTickets--;
                        totalPrice -= price;
                    } else {
                        // Select
                        seat.dataset.selected = 'true';
                        seat.style.background = '#ffffff';
                        seat.style.border = '2px solid ' + seat.dataset.originalColor;
                        seat.style.color = seat.dataset.originalColor;
                        seat.innerText = '✓';

                        totalTickets++;
                        totalPrice += price;
                    }

                    updateFooter();
                }

                function updateFooter() {
                    const footer = document.getElementById('bookingFooter');
                    const priceDisplay = document.getElementById('priceDisplay');
                    const countDisplay = document.getElementById('countDisplay');

                    if (totalTickets > 0) {
                        footer.classList.add('visible');
                        priceDisplay.textContent = totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                        countDisplay.textContent = 'x' + totalTickets;
                    } else {
                        footer.classList.remove('visible');
                    }
                }
            <\/script>
        </body>
        </html>
    `);
    preview.document.close();
}

// Save theater name on change
document.getElementById('theaterName').addEventListener('input', saveToStorage);

// Init
renderCategoryPresets();
updatePreview();
setTool('select');
loadFromStorage();
saveState(); // Initial state
