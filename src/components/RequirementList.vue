<template>
    <div class="requirement_list">
        <table>
            <thead>
                <tr>
                    <th>Cr Number</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Project</th>
                    <th>Owner</th>
                    <th>Version</th>
                    <th>Created at</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="entry.id" v-for="entry in cr_list">
                    <td>CR{{entry.id}}</td>
                    <td>{{entry.title}}</td>
                    <td>{{entry.status}}</td>
                    <td>{{entry.project.name}}</td>
                    <td>{{entry.owner.name}}</td>
                    <td>{{entry.version}}</td>
                    <td>{{formatDate(entry.created_at)}}</td>
                    <td class="action">
                        <div :key="action.id" v-for="action in loadActions(entry.status)">
                            <router-link tag="button" :to="{ name: 'Inspect', params: {id : entry.id, action : action }}">{{action}}</router-link>
                        </div>
                    </td>
                    <!--td v-for="key in entry">
                        {{entry[key]}}{{key}}
                    </td-->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {ICr} from '@/common/interfaces/ICr';
import {CrStatus} from '@/common/interfaces/CrStatus';
import {Actions} from '@/common/interfaces/Actions';
import {RouteNames} from '@/router/RouteNames';

export default Vue.extend({
    name: 'RequirementList',
    props: {
        cr_list: Array
    },
    data: function () {
        return {

        }
    },
    methods: {
        loadActions(status: CrStatus) : Actions[] {
            switch(status) { 
                case CrStatus.WaitForApprove: {
                    return [Actions.Approve, Actions.Reject, Actions.Inspect]; 
                }
                case CrStatus.Approved: {
                    return [Actions.AddAssignee, Actions.Inspect]; 
                }
                case CrStatus.WaitForApprove: {
                    return [Actions.Approve, Actions.Reject, Actions.Inspect]; 
                }
            }
            
            return [Actions.Inspect];
        },
        formatDate(date: Date) : String {
            return date.toLocaleDateString();
        }
    }
});

</script>

<style lang="scss">
    .requirement_list {
        padding: 0px;
        padding-top: 15px;

        table {
            width: 100%;
        }

        th {
            background: #CCCCCC;
            color: #161616;
        }

        tr:nth-child(odd) {background: #363636}

        table, tr, th, td {
            border: 1px solid #CCCCCC;
        }
    }

    .action * {
        display: inline-block;
        padding: 5px;

    }

</style>