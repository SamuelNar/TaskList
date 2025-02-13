const fs = require('fs');
const fileName = 'tasks.json';

// Leer las tareas desde el archivo JSON
function readTasks() {
    if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, JSON.stringify([]));
    }
    try {
        const data = fs.readFileSync(fileName, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('⚠️ Error al leer el archivo. Se reiniciarán las tareas...');
        fs.writeFileSync(fileName, JSON.stringify([]));
        return [];
    }
}

// Guardar las tareas en el archivo JSON
function saveTasks(tasks) {
    fs.writeFileSync(fileName, JSON.stringify(tasks, null, 2));
}

// Agregar una nueva tarea
function addTask(title) {
    try {
        if (!title || title.trim() === '') throw new Error('❌ Debes proporcionar un título entre comillas. Ejemplo: node main.js add "Mi tarea"');
        const tasks = readTasks();
        const newTask = { id: Date.now(), title, status: 'pending', modifiedAt: new Date().toISOString() };
        tasks.push(newTask);
        saveTasks(tasks);
        console.log(`✅ Tarea agregada con éxito: "${newTask.title}" (ID: ${newTask.id})`);
    } catch (error) {
        console.log(error.message);
    }
}

// Listar todas las tareas
function listTasks() {
    const tasks = readTasks();
    if (tasks.length === 0) {
        console.log('📭 No hay tareas.');
    } else {
        console.log('📋 Lista de tareas:');
        tasks.forEach(task => console.log(`🔹 [${task.status.toUpperCase()}] ID: ${task.id} - "${task.title}" (Última modificación: ${task.modifiedAt})`));
    }
}

function listTasksByStatus(status) {
    try {
        const tasks = readTasks();
    const filteredTasks = tasks.filter(task => task.status === status);
    const validStatuses = ["pending", "in-progress", "done"];   
    if (!validStatuses.includes(status)) throw new Error(`❌ Estado inválido. Usa uno de los siguientes: ${validStatuses.join(", ")}`);        
    if (filteredTasks.length === 0) {
        console.log(`📭 No hay tareas con estado "${status}".`);
    } else {
        console.log(`📋 Lista de tareas con estado "${status}":`);
        filteredTasks.forEach(task => console.log(`🔹 ID: ${task.id} - "${task.title}" (Última modificación: ${task.modifiedAt})`));
    }   
    } catch (error) {
        console.log(error.message);   
    }    
}

// Eliminar una tarea
function deleteTask(id) {
    try {
        if (!id) throw new Error('❌ Debes proporcionar un ID válido. Ejemplo: node main.js delete 12345');
        let tasks = readTasks();
        const filteredTasks = tasks.filter(task => task.id !== parseInt(id));
        if (tasks.length === filteredTasks.length) {
            throw new Error(`❌ No se encontró ninguna tarea con ID: ${id}`);
        }
        saveTasks(filteredTasks);
        console.log(`🗑️ Tarea eliminada con éxito (ID: ${id})`);
    } catch (error) {
        console.log(error.message);
    }
}

// Actualizar estado de una tarea
function updateTaskStatus(id, status) {
    try {
        if (!id || !status) throw new Error('❌ Debes proporcionar un ID y un estado entre comillas. Ejemplo: node main.js update 12345 "done"');
        const validStatuses = ["pending", "in-progress", "done"];
        if (!validStatuses.includes(status)) throw new Error(`❌ Estado inválido. Usa uno de los siguientes: ${validStatuses.join(", ")}`);
        
        let tasks = readTasks();
        let taskFound = false;
        tasks = tasks.map(task => {
            if (task.id === parseInt(id)) {
                task.status = status;
                task.modifiedAt = new Date().toISOString();
                taskFound = true;
            }
            return task;
        });
        if (!taskFound) throw new Error(`❌ No se encontró ninguna tarea con ID: ${id}`);
        saveTasks(tasks);
        console.log(`✅ Estado de la tarea actualizado con éxito (ID: ${id}, Nuevo estado: "${status}")`);
    } catch (error) {
        console.log(error.message);
    }
}


function start() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Procesar los comandos ingresados por el usuario
    rl.on('line', (input) => {
        const [command, ...args] = input.split(' ');

        if (command === 'exit') {
            console.log('👋 ¡Hasta luego!');
            rl.close();
            return;
        }

        switch (command) {
            case 'add':
                addTask(args.join(' '));
                break;
            case 'list':
                if (args.length > 0) {
                    listTasksByStatus(args[0]);
                } else {
                    listTasks();
                }
                break;
            case 'delete':
                deleteTask(args[0]);
                break;
            case 'update':
                updateTaskStatus(args[0], args[1]);
                break;
            default:
                console.log('❌ Comando no reconocido. Usa "add", "list", "delete", "update" o "exit".');
        }
    });

    console.log('🎯 Ingresa un comando (usa "exit" para salir):');
}

start();