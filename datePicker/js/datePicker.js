/**
 * Created by lynn on 2016/6/17.
 */

function datePicker($target){
    this.init($target);
    this.render();
    this.setData();
    this.bind();
}
datePicker.prototype = {
    init : function($target){
        this.$target = $target;
        if(this.isValidDate(this.$target.attr('date-init'))){
            this.date = new Date(this.$target.attr('date-init'));   //当前日期或者指定的要展示的日期
            this.watchDate = new Date(this.$target.attr('date-init'));  //用户在切换月份时所看到的日期,初始为当前日期
        }else{
            this.date =  new Date();
            this.watchDate = new Date();
        }

    },
    render : function(){
        var tpl = '<div class="ui-date-picker"  style="display:none"><div class="header">'+
            '<span class="pre caret-left"></span><span class="header-date"></span>'+
            '<span class="next caret-right"></span></div>'+
            '<table class="panel"><thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>'+
            '<tbody></tbody></table></div>';
        this.$datePicker = $(tpl);
        this.$datePicker.insertAfter(this.$target)
            .css({
                'position':'absolute',
                'top':this.$target.height(true)+this.$target.offset().top,
                'left':this.$target.offset().left
            });
    },
    setData : function(){
        this.$datePicker.find("tbody").empty();
        var firstDay = this.firstDay(this.watchDate),
            lastDay = this.lastDay(this.watchDate);
        // console.log(firstDay+','+lastDay);
        var dateArr = [];
        for(var i = firstDay.getDay(); i>0;i--){
            var d = new Date( firstDay.getTime() - i*24*60*60*1000 );
            dateArr.push( {type:'pre', date:d} );
        }
        for(var j= 0;j<lastDay.getDate();j++){
            var d = new Date(firstDay.getTime() + j*24*60*60*1000 );
            dateArr.push({type:'cur',date:d});
        }
        for(var k = 1; k < 7 - lastDay.getDay(); k++ ){
            var d = new Date( lastDay.getTime() + k*24*60*60*1000 );
            dateArr.push( {type:'next', date: d})
        }
        this.$datePicker.find(".header-date").text(this.watchDate.getFullYear()+'年'+(this.watchDate.getMonth()+1)+'月');
        //console.log(dateArr);
        var dateHtml = '';
        for(var n=0;n<dateArr.length;n++){
            if(n%7 === 0){
                dateHtml += '<tr>';
            }
            dateHtml += '<td class="';
            if(dateArr[n].type === 'pre'){
                dateHtml += 'pre-month';
            }else if(dateArr[n].type === 'cur'){
                dateHtml += 'cur-month';
            }else{
                dateHtml += 'next-month'
            }
            if(this.getYYMMDD(this.date) === this.getYYMMDD(dateArr[n].date)){
                dateHtml += ' cur-date';
            }
            dateHtml += '" ';
            dateHtml += ' data-date = " '+this.getYYMMDD(dateArr[n].date)+' "> ';
            dateHtml += this.toFixed( dateArr[n].date.getDate()) + '</td>';
            if(n%7 ===6){
                dateHtml += '<tr/>'
            }
        }
        // console.log(dateHtml);
        this.$datePicker.find('tbody').html(dateHtml);
    },
    bind : function(){
        var self = this;
        this.$target.on('click', function(e){
            e.stopPropagation();
            self.$datePicker.show();
        });
        $(window).on('click',function(){
            self.$datePicker.hide();
        })
        this.$datePicker.find('.pre').on('click', function(){
            self.watchDate = self.getPreMonth(self.watchDate);
            self.setData();
        });
        this.$datePicker.find('.next').on('click', function(){
            self.watchDate = self.getNextMonth(self.watchDate);
            self.setData();
        });
        this.$datePicker.on('click', '.cur-month', function(){
            self.$target.val($(this).attr('data-date'))
            self.$datePicker.hide();
        });
        this.$datePicker.on('click', function(e){
            e.stopPropagation();
        });
    },
    firstDay : function(date){
        var Year = date.getFullYear(),
            Month = date.getMonth();
        return newDate = new Date(Year,Month,1);
    },
    lastDay : function(date){
        var Year = date.getFullYear(),
            Month = date.getMonth();
        Month++;
        if(Month > 11){
            Year+=1;
        }
        var newDate = new Date(Year,Month,1);
        return new Date(newDate.getTime() - 1000*60*60*24);
    },
    isValidDate: function(dateStr) {
        return new Date(dateStr).toString() !== 'Invalid Date';
    },
    //获取date 上月1号时间对象
    getPreMonth: function(date){
        var year = date.getFullYear(),
            month = date.getMonth();

        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        return new Date(year, month, 1);
    },

    //获取date 下月1号时间对象
    getNextMonth: function(date){
        var year = date.getFullYear(),
            month = date.getMonth();

        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        return new Date(year, month, 1);
    },
    getYYMMDD: function(date){
        var yy = date.getFullYear(),
            mm = date.getMonth()+1
        return date.getFullYear() + "/" + this.toFixed(date.getMonth() + 1) + "/" + this.toFixed(date.getDate());
    },
    toFixed: function(n){
        return (n+'').length === 1 ? ('0'+ n+'') : (n+'');
    }
};