const book = document.getElementById('book');
const pages = document.querySelectorAll('.book-page');
const totalPages = pages.length;

// 1. ترتيب الصفحات في البداية (الغلاف يكون فوق الجميع)
pages.forEach((page, index) => {
    page.style.zIndex = totalPages - index;
});

// 2. التقليب للأمام
function turnPage(pageId) {
    const page = document.getElementById(`page-${pageId}`);
    if (!page) return;

    if (pageId === 1) book.classList.add('open');

    // نرفع الورقة لأعلى مستوى لكي تطير فوق جميع الصفحات
    page.style.zIndex = 50; 
    
    // نبدأ الحركة
    page.classList.add('turn');

    // عندما تصبح الورقة في المنتصف تماماً عمودياً (بعد نصف ثانية)، نرتبها في اليسار
    setTimeout(() => {
        page.style.zIndex = pageId; 
    }, 500);
}

// 3. التقليب للخلف (هنا كان السر)
function turnBack(pageId) {
    const page = document.getElementById(`page-${pageId}`);
    if (!page) return;

    if (pageId === 1) book.classList.remove('open');

    // السر هنا: نرفع الورقة لأعلى مستوى "قبل" أن تبدأ بالعودة لكي تظهر كطية كتاب حقيقية
    page.style.zIndex = 50; 

    // نزيل كلاس الدوران لتبدأ بالرجوع لليمين
    page.classList.remove('turn');

    // عندما تصبح في المنتصف، نعيدها لترتيبها الصحيح في الجهة اليمنى
    setTimeout(() => {
        page.style.zIndex = totalPages - pageId + 1;
    }, 500);
}
function turnBack(pageId) {
    const page = document.getElementById(`page-${pageId}`);
    if (!page) return;

    if (pageId === 1) book.classList.remove('open');

    // 1. نرفع الطبقة للأعلى لتبدأ الطي من فوق الصفحات
    page.style.zIndex = 50;

    // 2. نزيل كلاس الطي للأمام ونضيف كلاس العودة
    page.classList.remove('turn');
    
    // 3. تأخير بسيط لنسمح للمتصفح بالبدء من الوضعية المفتوحة
    setTimeout(() => {
        // هنا نعيد الترتيب بعد انتهاء حركة الطي (نصف ثانية)
        page.style.zIndex = totalPages - pageId + 1;
    }, 500);
}

// 4. إغلاق الكتاب بالكامل (مع نفس تأثير الورق)
function closeBook() {
    let delay = 0;
    for (let i = totalPages; i >= 1; i--) {
        const page = document.getElementById(`page-${i}`);
        if (page && page.classList.contains('turn')) {
            setTimeout(() => {
                // نرفع كل ورقة قبل أن تُغلق
                page.style.zIndex = 50; 
                page.classList.remove('turn');
                
                setTimeout(() => {
                    page.style.zIndex = totalPages - i + 1;
                }, 500);
                
                if (i === 1) book.classList.remove('open');
            }, delay);
            delay += 300; // تأخير زمني بسيط بين كل ورقة لتظهر بشكل متتابع
        }
    }
}