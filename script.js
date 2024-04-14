console.clear();
let csvData = [];
document.getElementById('excelInput').addEventListener('change', handleFile);

function handleFile(e) {
	var csvData = [];
	// Tạo bảng kết quả
	const outputDiv = document.getElementById('output');
	outputDiv.innerHTML = '';
	const table = document.createElement('table');
	const tr = document.createElement('tr');
	const td1 = document.createElement('td');
	const td2 = document.createElement('td');
	const td3 = document.createElement('td');
	const td4 = document.createElement('td');
	td1.textContent = "Giáo viên";
	tr.appendChild(td1);
	td2.textContent = "Ngày";
	tr.appendChild(td2);
	td3.textContent = "Giờ";
	tr.appendChild(td3);
	td4.textContent = "Lớp";
	tr.appendChild(td4);
	table.appendChild(tr);
	// Đọc tập tin Excel
	for (var i = 0; i < e.target.files.length; i++) {
		const file = e.target.files[i];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, {type: 'array'});
				// Đọc dữ liệu từ workbook, ví dụ:
				const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
				const jsonData = XLSX.utils.sheet_to_json(firstSheet, {header: 1});
				// Xử lý dữ liệu
				for (var row = 2; row < jsonData.length; row++) {
					for (col = 0; col < 7; col++) {
						if (jsonData[row][col] != undefined) {
							csvTemp = [];
							// Thêm dữ liệu vào bảng hiển thị
							const tr = document.createElement('tr');
							teacherName = file.name.slice(0, -4);
							classDay = jsonData[1][col];
							classTime = jsonData[row][col].split('\n')[0];
							className = jsonData[row][col].split('\n')[1];
							const td1 = document.createElement('td');
							const td2 = document.createElement('td');
							const td3 = document.createElement('td');
							const td4 = document.createElement('td');
							td1.textContent = teacherName;
							tr.appendChild(td1);
							td2.textContent = classDay;
							tr.appendChild(td2);
							td3.textContent = classTime;
							tr.appendChild(td3);
							td4.textContent = className;
							tr.appendChild(td4);
							table.appendChild(tr);
							// Thêm dữ liệu để lưu tập tin CSV
							csvTemp = [teacherName,classDay,classTime,className];
							csvData.push([teacherName,classDay,classTime,className]);
							//console.log(csvData);
						}
					}
				}
				outputDiv.appendChild(table);
			};
			reader.readAsArrayBuffer(file);
		}
	}
	console.log(csvData);
}

// Hàm lưu tập tin CSV
function csvSave() {
	console.log(csvData);
	//const data = "\ufeff" + csvData.map(row => row.join(",")).join("\n");
	//const saveFile = () => {
	//	const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
	//	saveAs(blob, "danh-sach.csv");
	//};
	//saveFile();
}