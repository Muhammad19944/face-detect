<template>
    <div class="activity-view">
        <user-dropdown
            :has-dropdown="false"
            dropdown-column
            class="mt-8 mb-6"
        />

        <div class="app-container">
            <div class="d-flex align-center">
                <div class="app-select mr-4">
                    <select v-model="filterSelect" class="border-all rounded outline-transparent px-2 py-3 font-600">
                        <option v-for="option in dateFilter" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>

                <div class="app-select mr-4">
                    <input
                        v-model="filterModel.startDate"
                        type="date"
                        id="begin"
                        name="begin"
                        min="2018-01-01"
                        max="2050-01-01"
                        class="border-all rounded outline-transparent px-2 py-3 font-600"
                    />
                </div>

                <div class="app-select mr-4">
                    <input
                        v-model="filterModel.endDate"
                        type="date"
                        id="end"
                        name="end"
                        min="2018-01-01"
                        max="2050-01-01"
                        class="border-all rounded outline-transparent px-2 py-3 font-600"
                    />
                </div>

                <div class="app-select mr-4">
                    <select v-model="filterModel.branchSelect" class="border-all rounded outline-transparent px-2 py-3 font-600">
                        <option
                            v-for="branch in branchesList"
                            :value="branch.value"
                            :key="branch.id"
                        >
                            {{ branch.text }}
                        </option>
                    </select>
                </div>

                <div class="ml-auto">
                    <template v-if="getUser">
                        <template v-if="getUser.is_staff">
                            <app-button
                                @emit:up="send"
                                text="Экспорт в эксель"
                                style="padding: calc(.6rem + 1px) calc(1.75rem + 1px)"
                            />
                        </template>
                    </template>
                </div>
            </div>

            <div class="app-table vs-table-content mt-4">
                <div class="vs-table">
                    <table>
                        <thead class="vs-table__thead">
                            <tr class="vs-table__tr">
                                <th class="vs-table__th"  style="width: 316px;">
                                    <div class="vs-table__th__content">
                                        <h6 class="font-600">Паспорт серия</h6>
                                    </div>
                                </th>
                                <th class="vs-table__th"  style="width: 250px;">
                                    <div class="vs-table__th__content">
                                        <h6 class="font-600">Дата рождение</h6>
                                    </div>
                                </th>
                                <th class="vs-table__th"  style="width: 379px;">
                                    <div class="vs-table__th__content">
                                        <h6 class="font-600">Результат</h6>
                                    </div>
                                </th>
                                <th class="vs-table__th"  style="width: 200px;">
                                    <div class="vs-table__th__content">
                                        <h6 class="font-600">Дата добавление</h6>
                                    </div>
                                </th>
                                <th class="vs-table__th"  style="width: 75px;">
                                    <div class="vs-table__th__content">
                                        <h6 class="font-600">Действие</h6>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="vs-table__tbody">
                            <tr
                                v-for="item in activityList"
                                :key="item.id"
                                class="vs-table__tr"
                            >
                                <td class="vs-table__td">
                                    <h6 class="font-600">{{ item.passport_data }}</h6>
                                </td>
                                <td class="vs-table__td">
                                    <h6 class="font-500">{{ item.dob }}</h6>
                                </td>
                                <td class="vs-table__td">
                                    <h6 class="font-500">{{ item.result }}</h6>
                                </td>
                                <td class="vs-table__td">
                                    <h6 class="font-500">
                                        {{ item.date_added.slice(0, 10) }} -
                                        {{ item.date_added.slice(11, 19) }}
                                    </h6>
                                </td>
                                <td class="vs-table__td">
                                    <router-link :to="{name: 'ActivityID', params: {id: item.id}}" class="icon-button pointer d-flex align-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="app-pagination mt-5 pt-5 d-flex justify-center border-top">
	            <v-pagination
		            @input="paginate"
		            v-model="$store.state.pagination.page"
		            :length="$store.state.pagination.page_length"
		            :total-visible="7"
	            ></v-pagination>

<!--                <ul class="d-flex flex-wrap">-->
<!--                    <li-->
<!--                        v-for="(item, index) in $store.state.pagination.page_length"-->
<!--                        :key="item"-->
<!--                        class="border-all rounded d-flex align-center justify-center pointer ma-1"-->
<!--                        @click="paginate(item)"-->
<!--                        >-->
<!--                        <span class="font-600 text-12">{{ index + 1 }}</span>-->
<!--                    </li>-->
<!--                </ul>-->
            </div>
        </div>
    </div>
</template>

<script>
import $http from '@/plugins/axios'
import UserDropdown from '@/components/BaseComponents/UserDropdown'
import AppButton from '@/components/BaseComponents/Button'
import { mapGetters } from 'vuex'

export default {
    name: 'List',
    data() {
        return {
            activityList: [],
            filterSelect: 'today',
            dateFilter: [
                {
                    text: 'Сегодня',
                    value: 'today'
                },
                {
                    text: 'Вчерашний',
                    value: 'yesterday'
                },
                {
                    text: 'Неделя',
                    value: 'week'
                },
                {
                    text: 'Месяц',
                    value: 'month'
                },
                {
                    text: 'Год',
                    value: 'year'
                },
            ],
            branchesList: [
                {
                    id: 3,
                    text: "АНДИЖОН ФИЛИАЛИ",
                    value: "00069"
                },
                {
                    id: 4,
                    text: "БОБУР ФИЛИАЛИ",
                    value: "00073"
                },
                {
                    id: 5,
                    text: "БУХОРО ФИЛИАЛИ",
                    value: "00120"
                },
                {
                    id: 6,
                    text: "ЖИЗЗАХ ФИЛИАЛИ",
                    value: "00140"
                },
                {
                    id: 7,
                    text: "КАРШИ ФИЛИАЛИ",
                    value: "00194"
                },
                {
                    id: 8,
                    text: "НАВОИЙ ФИЛИАЛИ",
                    value: "00206"
                },
                {
                    id: 9,
                    text: "НАМАНГАН ФИЛИАЛИ",
                    value: "00231"
                },
                {
                    id: 10,
                    text: "САМАРКАНД ФИЛИАЛИ",
                    value: "00264"
                },
                {
                    id: 11,
                    text: "ТЕРМИЗ ФИЛИАЛИ",
                    value: "00358"
                },
                {
                    id: 12,
                    text: "ГУЛИСТОН ФИЛИАЛИ",
                    value: "00373"
                },
                {
                    id: 13,
                    text: "НУРАФШОН ФИЛИАЛИ",
                    value: "00411"
                },
                {
                    id: 14,
                    text: "ПОЙТАХТ ФИЛИАЛИ",
                    value: "00416"
                },
                {
                    id: 15,
                    text: "АВТОТРАНСПОРТ ФИЛИАЛИ",
                    value: "00417"
                },
                {
                    id: 16,
                    text: "ФАРГОНА ФИЛИАЛИ",
                    value: "00539"
                },
                {
                    id: 17,
                    text: "УРГАНЧ ФИЛИАЛИ",
                    value: "00581"
                },
                {
                    id: 18,
                    text: "НУКУС ФИЛИАЛИ",
                    value: "00625"
                },
                {
                    id: 19,
                    text: "КУКОН ФИЛИАЛИ",
                    value: "00631"
                },
                {
                    id: 20,
                    text: "СЕРГЕЛИ ФИЛИАЛИ",
                    value: "00958"
                },
                {
                    id: 21,
                    text: "ЮНУСОБОД ФИЛИАЛИ",
                    value: "00963"
                },
                {
                    id: 22,
                    text: "ШАЙХОНТОХУР ФИЛИАЛИ",
                    value: "00969"
                },
                {
                    id: 23,
                    text: "ЗАРАФШОН ФИЛИАЛИ",
                    value: "01021"
                },
                {
                    id: 24,
                    text: "ХАЗОРАСП ФИЛИАЛИ",
                    value: "01169"
                },
            ],
            filterModel: {
                startDate: "",
                endDate: "",
                branchSelect: "00069"
            }
        }
    },
    components: {
        UserDropdown,
        AppButton
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    watch: {
        filterSelect() {
            this.getList()
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        /*
        *
        * */
        getList() {
            $http.get('/client/information/list',{
                params: {
                    time: this.filterSelect,
                    page: this.$store.state.pagination.page,
                    page_size: this.$store.state.pagination.page_size
                }
            })
            .then(({ data }) => {
                this.activityList = data.results

                this.$store.state.pagination.page_length = Math.ceil(
                    data.count / this.$store.state.pagination.page_size
                );
            })
        },

        /*
        *
        * */
        paginate(val) {
	        this.$store.state.pagination.page = val;

            this.getList();
        },

        /*
        *
        * */
        send() {
            $http.get('/export_to_csv/', {
                responseType: 'blob',
                params: {
                    mfo: this.filterModel.branchSelect,
                    start_date: this.filterModel.startDate,
                    end_date: this.filterModel.endDate,
                }
            })
            .then(({ data }) => {
                const url = window.URL.createObjectURL(new Blob([data]));

                console.log(new Blob([data]))

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download',  'result' + '.csv');
                document.body.appendChild(link);
                link.click();
            })
        }
    }
}
</script>

<style>

</style>
