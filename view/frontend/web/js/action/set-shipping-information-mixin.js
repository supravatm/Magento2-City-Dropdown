define([
    'jquery',
    'mage/utils/wrapper',
    'mage/template',
    'mage/validation',
    'underscore',
    'jquery/ui'
], function ($, wrapper) {
    'use strict';

    return function (setShippingInformationAction) {

        var directoryData = {
            "RO":
                {
                    "name": "Romania",
                    "regions": {
                        "278": {
                            "code": "AB",
                            "name": "Alba",
                            "cities": {
                                "1": {
                                    "name": "Aiud",
                                    "id": "1"
                                },
                                "2": {
                                    "name": "Abrud",
                                    "id": "2"
                                }
                            }
                        },
                        "279": {
                            "code": "AR",
                            "name": "Arad",
                            "cities": {
                                "1": {
                                    "name": "Arad",
                                    "id": "3"
                                },
                                "2": {
                                    "name": "Baia",
                                    "id": "4"
                                }
                            }
                        }
                    }
                }
        };

        var string = JSON.stringify(directoryData),
            obj = JSON.parse(string),
            romania = obj.RO;

        var region_id = $("[name = 'region_id'] option:selected").val(),
            region = romania.regions[region_id],
            city = $("[name='city']"),
            initialInput = city.val(''),
            cityId = $("[name *='city_id']");


        if (region_id) {
            var cityHtml = city.parent().html(),
                selectCity = cityHtml.replace("input", "select") + '</select>',
                cityObject = $(selectCity),
                htmlSelect = '<option value></option>',
                cityName,
                options,
                selectOptions;

            cityObject.empty();

            $.each(region, function (index, value) {
                if ($.isPlainObject(value)) {
                    $.each(value, function (index, romCity) {

                        cityName = romCity.name;
                        options = '<option value=' + cityName + '>' + cityName + '</option>';
                        htmlSelect += options;
                    })
                }
            });

            selectOptions = cityObject.append(htmlSelect);

            if (typeof region !== 'undefined') {
                // city.replaceWith(selectOptions);
                cityId.show();
                city.hide();
            }
            else {
                city.show();
                cityId.hide();
                // city.replaceWith(initialInput);
            }
        }


        $(document).on('change', "[name='country_id']", function () {
        });

        $(document).on('change', "[name='region_id']", function () {
            console.log('test');

            var region_id = $(this).val(),
                region = romania.regions[region_id];

            if (region_id) {
                var cityId = $("[name *='city_id']");
                var city = $("[name='city']"),
                    cityHtml = city.parent().html(),
                    selectCity = cityHtml.replace("input", "select") + '</select>',
                    cityObject = $(selectCity),
                    selectClass = cityObject.addClass('select').removeClass('input-text'),
                    htmlSelect = '<option value></option>',
                    cityName,
                    options,
                    selectOptions;

                cityObject.empty();

                $.each(region, function (index, value) {
                    if ($.isPlainObject(value)) {
                        $.each(value, function (index, romCity) {

                            cityName = romCity.name;
                            options = '<option value=' + cityName + '>' + cityName + '</option>';
                            htmlSelect += options;
                        })
                    }
                });

                selectOptions = cityObject.append(htmlSelect);

                if (typeof region !== 'undefined') {
                    cityId.show();
                    city.hide();
                    // city.replaceWith(selectOptions);
                }
                else {
                    city.show();
                    cityId.hide();
                    // city.replaceWith(initialInput);
                }
            }

        });

        return wrapper.wrap(setShippingInformationAction, function (originalAction, messageContainer) {


            return originalAction(messageContainer);
        });
    };
});