/*
 * 地区选择
 * layui.cityselect.Init('userinfo_form','120000','120200','120225');
 *
 */
layui.config({
    base:'/static/common/layui/lay/modules/'
}).define(['layer', 'form', 'areas', 'laytpl'], function (exports) {
    var $ = layui.jquery,
        form = layui.form(),
        areaData = layui.areas,
        laytpl = layui.laytpl;

    var citySelect = {
        $form:null,
        $tpl: '{{#  layui.each(d, function(index, item){ }}<option value="{{ item.provinceCode }}" data-subsetnum="{{ item.mallCityList.length }}" data-index="{{ index }}" >{{ item.provinceName }}</option>{{#  }); }}',
        $tplCity: '{{#  layui.each(d, function(index, item){ }}<option value="{{ item.cityCode }}" data-subsetnum="{{ item.mallAreaList.length }}" data-index="{{ index }}" >{{ item.cityName }}</option>{{#  }); }}',
        $tplArea: '{{#  layui.each(d, function(index, item){ }}<option value="{{ item.areaCode }}" >{{ item.areaName }}</option>{{#  }); }}',
        $defaultVal: { pCode: "", cCode: "", aCode: "" },
        $selects: {
            province: function () { return $(citySelect.$form).find('select[name=province]'); },
            area: function () { return $(citySelect.$form).find('select[name=area]'); },
            city: function () { return $(citySelect.$form).find('select[name=city]'); },
        },
        Init: function (myform,pCode,cCode,aCode) {
            var othis = this;
            if (pCode)
                othis.$defaultVal.pCode = pCode;
            if (cCode)
                othis.$defaultVal.cCode = cCode;
            if (aCode)
                othis.$defaultVal.aCode = aCode;
            if (!myform) {
                othis.$form = $('form');
            }
            else if (typeof myform == "string") {
                othis.$form = $('.' + myform);
                if (othis.$form.length == 0)
                    othis.$form = $('#' + myform);
                if (othis.$form.length == 0)
                    othis.$form = $('form[name=' + myform + ']');
            }
            else
                othis.$form = $(myform);

            if (!othis.$form)
                return;
            var html = laytpl(othis.$tpl).render(areaData);
            //初始化省数据
            othis.$selects.province().append(html);
            //默认选中
            othis.defaultSelected();
            //更新
            form.render('select');
            //监听
            form.on('select(province)', function (data) {
                othis.$selects.city().html('<option value="">请选择市</option>').parent().hide();
                othis.$selects.area().html('<option value="">请选择县/区</option>').parent().hide();
                var option = $(data.elem).find('[value=' + data.value + ']');
                var count = $(option).attr('data-subsetnum'),
                    index = $(option).attr('data-index');
                if (count > 0) {
                    othis.loadCity(areaData[index].mallCityList);
                }
                else {
                    othis.$selects.city().parent().hide();
                }
            });
        }
        ,
        loadCity: function (citys) {
            var othis = this;
            var html = laytpl(othis.$tplCity).render(citys);
            othis.$selects.city().append(html).parent().show();
            form.render('select');
            form.on('select(city)', function (data) {
                othis.$selects.area().html('<option value="">请选择县/区</option>').parent().hide();
                var option = $(data.elem).find('[value=' + data.value + ']');
                var count = $(option).attr('data-subsetnum'),
                    index = $(option).attr('data-index');
                if (count > 0) {
                    othis.loadArea(citys[index].mallAreaList);
                }
                else {
                    othis.$selects.area().parent().hide();
                }
            });
        },
        loadArea: function (areas) {
            var othis = this;
            var html = laytpl(othis.$tplArea).render(areas);
            othis.$selects.area().append(html).parent().show();
            form.render('select');
            form.on('select(area)', function (data) {

            });
        },
        defaultSelected: function () {
            var othis = this;
            var province = othis.$selects.province();
            if (!othis.$defaultVal.pCode) {
                return;
            }
            //选中
            province.val(othis.$defaultVal.pCode);
            var data = province.find('[value=' + othis.$defaultVal.pCode + ']');
            if (data.attr('data-subsetnum') == 0 || !othis.$defaultVal.cCode) {
                return;
            }
            //展开
            othis.loadCity(areaData[data.attr('data-index')].mallCityList);
            var city = othis.$selects.city();
            //选中
            city.val(othis.$defaultVal.cCode);
            var citydata = city.find('[value=' + othis.$defaultVal.cCode + ']');
            if (citydata.attr('data-subsetnum') == 0 || !othis.$defaultVal.aCode) {
                return;
            }
            //展开
            othis.loadArea(areaData[data.attr('data-index')].mallCityList[citydata.attr('data-index')].mallAreaList);
            //选中
            othis.$selects.area().val(othis.$defaultVal.aCode);

        }
    };
    exports('cityselect', citySelect);
});
