$(document).ready(function(){
    function isValidPhoneNumber(phone) {
        var regex = /^(0|\+84)([0-9]{9})$/;
        if (!regex.test(phone)) {
            return false
        } else {
            return true
        }
    }

    function slugify(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // loại bỏ khoảng trắng thừa
        str = str.toLowerCase(); // chuyển thành chữ thường
        str = str.replace(/[^a-z0-9 -]/g, '') // loại bỏ các ký tự đặc biệt
            .replace(/\s+/g, '-') // thay thế khoảng trắng bằng dấu gạch ngang
            .replace(/-+/g, '-'); // loại bỏ dấu gạch ngang liên tiếp
        return str;
    }

    // hàm kiểm tra ngày, thang năm

    function checkDate(inputDate) {
        // Lấy ngày tháng năm từ input
        let input = new Date(inputDate);
        const inputDay = input.getDate();
        const inputMonth = input.getMonth() + 1;
        const inputYear = input.getFullYear();

        // lấy ngày tháng năm hiện tại

        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // Tạo đối tượng Date từ ngày tháng năm của input và ngày tháng năm hiện tại

        let selectedDate = new Date();
        let systemDate = new Date();

        if(inputDate.includes("/")) {
            selectedDate = new Date(String(`${inputYear}/${inputMonth}/${inputDay}`));
            systemDate = new Date(String(`${currentYear}/${currentMonth}/${currentDay}`));

        } else if(inputDate.includes("-")){
            selectedDate = new Date(String(`${inputYear}--${inputMonth}--${inputDay}`));
            systemDate = new Date(String(`${currentYear}--${currentMonth}--${currentDay}`));
        }
        
        // So sánh hai đối tượng Date
        if(selectedDate.getTime() < systemDate.getTime()) {
            return false;
        }else{
            return true;
        }
    }
        // hàm kiểm tra giờ

    function validateTime(inputTime) {
        const currentTime = new Date();
        const [currentHour] = [currentTime.getHours()];

        const [inputHour] = inputTime.split(':').map(val => parseInt(val));

        if (inputHour < currentHour || (inputHour === currentHour)) {
            return false;
        }
        return true;
    }

    $("#order_btn_submit").click(function(e) {
        var name = $('#order_name').val();
        var phone = $('#order_phone').val();
        var date = $('#order_date').val();
        var persion = $('#order_person').val();
        var message = $('#order_message').val();
        console.log(name,phone,date,persion);
        str_description = String(
            `-Số người: ${persion} \n - Ngày dùng bữa: ${date} \n - Ghi chú: ${message}`
        )

        if (name=="" || phone == "" || date == "" || persion == "") {
            notie.alert({type:'warning',text:'Thông tin chưa được nhập đầy đủ. Vui lòng nhập lại!',time:1.5})
        } else if(!checkDate(date)) {
            notie.alert({type:'warning',text:'Ngày đặt không bé hơn ngày hiện tại!',time:1.5})
        } else if(!isValidPhoneNumber(phone)) {
            notie.alert({ type: 'warning', text: 'Ồ có vẻ phone không hợp lệ!', time: 1.5 })
        }else {
            console.log("co zo ajax")
            $.ajax({
                type:"POST",
                url:'/order_reservation',
                data:{
                    name:name,
                    phone:phone,
                    description:str_description
                }
            }).done(function(response){
                console.log(response)
                data = JSON.parse(response);
                console.log(data);
                if(data.success.code == 200) {
                    notie.alert({ type: 'success', text: 'Thông tin đã được ghi nhận, Xin chân thành cảm ơn!', time: 1.5 })
                }
            }).fail(function(data){
                console.log( "failed: " + data );

            })
        }
        
    })




});